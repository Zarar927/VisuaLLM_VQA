# import os
# from reportlab.lib.pagesizes import letter, A4
# from reportlab.pdfgen import canvas
# from reportlab.lib.utils import ImageReader
# from django.conf import settings

# def generate_pdf(image_path: str, question: str, answer: str, filename: str = None, page_size="A4"):
#     if page_size.upper() == "LETTER":
#         ps = letter
#     else:
#         ps = A4

#     # Make sure the MEDIA folder exists
#     os.makedirs(settings.MEDIA_ROOT, exist_ok=True)

#     # Make a name for the PDF file
#     if not filename:
#         import time
#         filename = f"vqa_response_{int(time.time())}.pdf"

#     pdf_full_path = os.path.join(settings.MEDIA_ROOT, filename)
#     c = canvas.Canvas(pdf_full_path, pagesize=ps)
#     width, height = ps

#     # Title
#     c.setFont("Helvetica-Bold", 16)
#     c.drawString(40, height - 60, "VisuaLLM — VQA Result")

#     # Question
#     c.setFont("Helvetica-Bold", 12)
#     c.drawString(40, height - 95, "Question:")
#     c.setFont("Helvetica", 11)
#     text_obj = c.beginText(40, height - 110)
#     for line in _wrap_text(question or "No question provided.", 85):
#         text_obj.textLine(line)
#     c.drawText(text_obj)

#     # Answer
#     c.setFont("Helvetica-Bold", 12)
#     y_after_question = height - 150
#     c.drawString(40, y_after_question, "Answer:")
#     c.setFont("Helvetica", 11)
#     text_obj = c.beginText(40, y_after_question - 15)
#     for line in _wrap_text(answer or "No answer.", 85):
#         text_obj.textLine(line)
#     c.drawText(text_obj)

#     # Add image
#     image_y = y_after_question - 140
#     if image_y < 60:
#         image_y = 60

#     try:
#         image_reader = ImageReader(image_path)
#         img_width, img_height = image_reader.getSize()
#         max_w = width - 80
#         max_h = image_y - 60
#         scale = min(max_w / img_width, max_h / img_height, 1.0)
#         draw_w = img_width * scale
#         draw_h = img_height * scale
#         x = (width - draw_w) / 2
#         c.drawImage(image_reader, x, 60, width=draw_w, height=draw_h, preserveAspectRatio=True, mask='auto')
#     except Exception:
#         c.setFont("Helvetica-Oblique", 10)
#         c.drawString(40, 60, "Image could not be embedded.")

#     c.showPage()
#     c.save()

#     # Return PDF name
#     return filename


# def _wrap_text(text, max_chars):
#     words = text.split()
#     lines = []
#     current = ""
#     for w in words:
#         if len(current) + 1 + len(w) <= max_chars:
#             current = (current + " " + w).strip()
#         else:
#             lines.append(current)
#             current = w
#     if current:
#         lines.append(current)
#     return lines


import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from django.conf import settings


def generate_pdf(image_path: str, question: str, answer: str, filename: str = None, page_size="A4"):
    # Select page size
    if page_size.upper() == "LETTER":
        ps = letter
    else:
        ps = A4

    # ✅ Ensure /media/pdfs/ folder exists
    pdf_dir = os.path.join(settings.MEDIA_ROOT, "pdfs")
    os.makedirs(pdf_dir, exist_ok=True)

    # Generate file name
    if not filename:
        import time
        filename = f"vqa_response_{int(time.time())}.pdf"

    # ✅ Save inside media/pdfs/
    pdf_full_path = os.path.join(pdf_dir, filename)

    c = canvas.Canvas(pdf_full_path, pagesize=ps)
    width, height = ps

    # Title
    c.setFont("Helvetica-Bold", 16)
    c.drawString(40, height - 60, "VisuaLLM — VQA Result")

    # Question
    c.setFont("Helvetica-Bold", 12)
    c.drawString(40, height - 95, "Question:")
    c.setFont("Helvetica", 11)
    text_obj = c.beginText(40, height - 110)
    for line in _wrap_text(question or "No question provided.", 85):
        text_obj.textLine(line)
    c.drawText(text_obj)

    # Answer
    c.setFont("Helvetica-Bold", 12)
    y_after_question = height - 150
    c.drawString(40, y_after_question, "Answer:")
    c.setFont("Helvetica", 11)
    text_obj = c.beginText(40, y_after_question - 15)
    for line in _wrap_text(answer or "No answer.", 85):
        text_obj.textLine(line)
    c.drawText(text_obj)

    # Add image
    image_y = y_after_question - 140
    if image_y < 60:
        image_y = 60

    try:
        image_reader = ImageReader(image_path)
        img_width, img_height = image_reader.getSize()
        max_w = width - 80
        max_h = image_y - 60
        scale = min(max_w / img_width, max_h / img_height, 1.0)
        draw_w = img_width * scale
        draw_h = img_height * scale
        x = (width - draw_w) / 2
        c.drawImage(image_reader, x, 60, width=draw_w, height=draw_h, preserveAspectRatio=True, mask='auto')
    except Exception:
        c.setFont("Helvetica-Oblique", 10)
        c.drawString(40, 60, "Image could not be embedded.")

    c.showPage()
    c.save()

    # ✅ Return relative path for MEDIA_URL
    return "pdfs/" + filename


def _wrap_text(text, max_chars):
    words = text.split()
    lines = []
    current = ""
    for w in words:
        if len(current) + 1 + len(w) <= max_chars:
            current = (current + " " + w).strip()
        else:
            lines.append(current)
            current = w
    if current:
        lines.append(current)
    return lines
