
import os
from PIL import Image
import torch
from transformers import (
    BlipProcessor,
    BlipForConditionalGeneration,
    BlipForQuestionAnswering,
    pipeline
)

# Select device (GPU if available)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ---------------------------------------------------
# 🧠 Load BLIP Models
# ---------------------------------------------------
caption_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
caption_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base").to(device)
caption_model.eval()

vqa_processor = BlipProcessor.from_pretrained("Salesforce/blip-vqa-base")
vqa_model = BlipForQuestionAnswering.from_pretrained("Salesforce/blip-vqa-base").to(device)
vqa_model.eval()

# ---------------------------------------------------
# 💬 Load FLAN-T5 for Language Refinement
# ---------------------------------------------------
refiner = pipeline("text2text-generation", model="google/flan-t5-base")

# ---------------------------------------------------
# 📸 Generate Caption
# ---------------------------------------------------
def generate_caption(image_path: str) -> str:
    """Generate a caption for the given image using BLIP captioning model."""
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")

    image = Image.open(image_path).convert("RGB")
    try:
        inputs = caption_processor(images=image, return_tensors="pt").to(device)
        with torch.no_grad():
            outputs = caption_model.generate(**inputs, max_new_tokens=40)
        caption = caption_processor.decode(outputs[0], skip_special_tokens=True).strip()
        return caption
    finally:
        image.close()

# ---------------------------------------------------
# 💡 Generate Detailed Answer (BLIP + FLAN-T5)
# ---------------------------------------------------
def generate_answer(image_path: str, question: str) -> str:
    """Generate an intelligent, human-like answer using BLIP VQA + FLAN-T5."""
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")

    image = Image.open(image_path).convert("RGB")
    try:
        # Step 1️⃣: Short factual answer with BLIP
        inputs = vqa_processor(image, question, return_tensors="pt").to(device)
        with torch.no_grad():
            outputs = vqa_model.generate(**inputs, max_new_tokens=50, num_beams=3)
        raw_answer = vqa_processor.decode(outputs[0], skip_special_tokens=True).strip()

        # Step 2️⃣: Expand into a natural paragraph using FLAN-T5
        prompt = (
            f"The image shows: {raw_answer}. "
            f"Question: {question}. "
            "Write a clear and detailed answer in one or two sentences:"
        )
        refined = refiner(prompt, max_length=100, num_return_sequences=1)[0]["generated_text"]

        return refined.strip()
    finally:
        image.close()
