# # backend/core/api/vqa.py
# import os
# from PIL import Image
# import torch
# from transformers import (
#     BlipProcessor,
#     BlipForConditionalGeneration,
#     BlipForQuestionAnswering,
#     pipeline
# )

# # device selection
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# # -------------------------
# # Load models once (startup)
# # -------------------------
# # BLIP caption model
# caption_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
# caption_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base").to(device)
# caption_model.eval()

# # BLIP VQA model
# vqa_processor = BlipProcessor.from_pretrained("Salesforce/blip-vqa-base")
# vqa_model = BlipForQuestionAnswering.from_pretrained("Salesforce/blip-vqa-base").to(device)
# vqa_model.eval()

# # FLAN-T5 refiner (text-to-text)
# refiner = pipeline("text2text-generation", model="google/flan-t5-base", device=0 if device.type == "cuda" else -1)


# def generate_caption(image_path: str) -> str:
#     if not os.path.exists(image_path):
#         raise FileNotFoundError(f"Image not found: {image_path}")
#     img = Image.open(image_path).convert("RGB")
#     try:
#         inputs = caption_processor(images=img, return_tensors="pt").to(device)
#         with torch.no_grad():
#             outputs = caption_model.generate(**inputs, max_new_tokens=40)
#         caption = caption_processor.decode(outputs[0], skip_special_tokens=True).strip()
#         return caption
#     finally:
#         img.close()


# def generate_answer(image_path: str, question: str) -> str:
#     """
#     Use BLIP VQA to produce a factual short answer, then refine with FLAN-T5 into a short paragraph.
#     Returns a clean text answer (no caption appended).
#     """
#     if not os.path.exists(image_path):
#         raise FileNotFoundError(f"Image not found: {image_path}")

#     img = Image.open(image_path).convert("RGB")
#     try:
#         # BLIP VQA → short factual output
#         inputs = vqa_processor(img, question, return_tensors="pt").to(device)
#         with torch.no_grad():
#             outputs = vqa_model.generate(**inputs, max_new_tokens=50, num_beams=3)
#         raw_answer = vqa_processor.decode(outputs[0], skip_special_tokens=True).strip()

#         # If raw_answer is short or repetitive, refine with FLAN-T5
#         prompt = (
#             f"Image info (short): {raw_answer}\n"
#             f"Question: {question}\n"
#             "Provide a clear, concise answer in 1-3 sentences, avoid repetition:"
#         )
#         refined = refiner(prompt, max_length=120, num_return_sequences=1)[0]["generated_text"].strip()

#         # Some FLAN outputs may repeat the prompt; return refined if meaningful otherwise raw
#         final = refined if len(refined) > len(raw_answer) else raw_answer
#         return final
#     finally:
#         img.close()


# backend/core/api/vqa.py
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.core.files.storage import default_storage

# # Import ML functions from ml_utils
# from core.ml_utils import generate_caption, generate_answer


# class VQAAPIView(APIView):
#     """
#     API endpoint for Visual Question Answering (VQA)
#     """

#     def post(self, request):
#         try:
#             image = request.FILES.get("image")
#             question = request.data.get("question", "")

#             if not image:
#                 return Response({"error": "No image uploaded."}, status=status.HTTP_400_BAD_REQUEST)

#             # Save uploaded image temporarily
#             image_path = default_storage.save(f"temp/{image.name}", image)

#             # Generate response
#             if question:
#                 answer = generate_answer(image_path, question)
#             else:
#                 answer = generate_caption(image_path)

#             return Response(
#                 {
#                     "question": question,
#                     "answer": answer,
#                     "image": image.name
#                 },
#                 status=status.HTTP_200_OK
#             )

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.core.files.storage import default_storage

# # Import ML functions from ml_utils
# from core.ml_utils import generate_caption, generate_answer


# class VQAAPIView(APIView):
#     """
#     API endpoint for Visual Question Answering (VQA)
#     """

#     def post(self, request):
#         try:
#             image = request.FILES.get("image")
#             question = request.data.get("question", "")

#             if not image:
#                 return Response({"error": "No image uploaded."}, status=status.HTTP_400_BAD_REQUEST)

#             # Save uploaded image temporarily
#             image_path = default_storage.save(f"temp/{image.name}", image)

#             # Generate response
#             if question:
#                 answer = generate_answer(image_path, question)
#             else:
#                 answer = generate_caption(image_path)

#             return Response(
#                 {
#                     "question": question,
#                     "answer": answer,
#                     "image": image.name
#                 },
#                 status=status.HTTP_200_OK
#             )

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.core.files.storage import default_storage

# class VQAAPIView(APIView):
#     """
#     🌍 Visual Question Answering (VQA) API — Multilingual Support
#     """

#     def post(self, request):
#         try:
#             image = request.FILES.get("image")
#             question = request.data.get("question", "")

#             if not image:
#                 return Response({"error": "No image uploaded."}, status=status.HTTP_400_BAD_REQUEST)

#             # ✅ Save uploaded image temporarily
#             image_path = default_storage.save(f"temp/{image.name}", image)

#             # 🌐 Detect language of the question (default English if blank)
#             if question.strip():
#                 detected_lang = detect_language(question)
#             else:
#                 detected_lang = "en"

#             # 🧠 Generate the appropriate response
#             if question:
#                 answer = generate_answer(image_path, question, target_lang=detected_lang)
#             else:
#                 answer = generate_caption(image_path, target_lang=detected_lang)

#             # 🚀 Return structured response
#             return Response(
#                 {
#                     "question": question,
#                     "language": detected_lang,
#                     "answer": answer,
#                     "image": image.name,
#                 },
#                 status=status.HTTP_200_OK,
#             )

#         except Exception as e:
#             return Response(
#                 {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

# core/api/vqa.py

# from langdetect import detect

# def detect_language(text):
#     """
#     Detects the language of the given text.
#     """
#     try:
#         return detect(text)
#     except:
#         return "en"

# def generate_caption(image_path, target_lang="en"):
#     """
#     Generates a caption for an image (demo purpose).
#     """
#     if target_lang == "ur":
#         return "یہ سلائی مشین ہے۔"
#     elif target_lang == "fr":
#         return "C'est une machine à coudre."
#     else:
#         return "This is a sewing machine."

# def generate_answer(image_path, question, target_lang="en"):
#     """
#     Answers a question about the uploaded image.
#     """
#     question = question.lower()
#     if "machine" in question and target_lang == "ur":
#         return "یہ سلائی مشین ہے جو کپڑے سینے کے لیے استعمال ہوتی ہے۔"
#     elif "machine" in question and target_lang == "fr":
#         return "C'est une machine à coudre utilisée pour coudre des vêtements."
#     else:
#         return "This is a sewing machine used for stitching clothes."


# core/api/vqa.py

# from langdetect import detect, LangDetectException

# def detect_language(text):
#     """
#     Detects the language of the given text.
#     Returns language code (e.g., 'en', 'ur', 'fr').
#     Defaults to 'en' if detection fails.
#     """
#     try:
#         return detect(text)
#     except LangDetectException:
#         return "en"
#     except Exception:
#         return "en"


# def generate_caption(image_path, target_lang="en"):
#     """
#     Generates a caption for an image (demo purpose).
#     You can later replace this with a real image captioning model.
#     """
#     captions = {
#         "en": "This is a sewing machine.",
#         "ur": "یہ سلائی مشین ہے۔",
#         "fr": "C'est une machine à coudre."
#     }
#     return captions.get(target_lang, captions["en"])


# def generate_answer(image_path, question, target_lang="en"):
#     """
#     Answers a question about the uploaded image (demo purpose).
#     Currently uses keyword-based logic for 'machine'.
#     """
#     question = question.lower()

#     # Keyword detection for demo
#     if "machine" in question:
#         answers = {
#             "en": "This is a sewing machine used for stitching clothes.",
#             "ur": "یہ سلائی مشین ہے جو کپڑے سینے کے لیے استعمال ہوتی ہے۔",
#             "fr": "C'est une machine à coudre utilisée pour coudre des vêtements."
#         }
#         return answers.get(target_lang, answers["en"])

#     # Default answer if keyword not detected
#     return generate_caption(image_path, target_lang=target_lang)



# core/api/vqa.py
import os
from PIL import Image
from langdetect import detect

# NOTE: keep this module free of any Django or project view imports.

def detect_language(text: str) -> str:
    try:
        return detect(text)
    except Exception:
        return "en"

def generate_caption(image_path: str, target_lang: str = "en") -> str:
    # placeholder simple caption (replace with your BLIP code)
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")
    caption = "This is a sewing machine."
    if target_lang == "ur":
        return "یہ سلائی مشین ہے۔"
    return caption

def generate_answer(image_path: str, question: str, target_lang: str = "en") -> str:
    # placeholder VQA (replace with BLIP/VQA + FlanT5 code)
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")
    q = question.lower()
    if "what" in q or "tell" in q:
        ans = "This is a sewing machine used to stitch clothes."
    else:
        ans = "I think it is a sewing machine."
    # simulate translation back if needed (you already have translator functions later)
    if target_lang == "ur":
        return "یہ کپڑے سینے کے لیے استعمال ہونے والی سلائی مشین ہے۔"
    return ans
