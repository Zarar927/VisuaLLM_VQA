

# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from .models import UploadedImage
# from .serializers import UploadedImageSerializer

# # ⬇️ import your caption generator
# from .ml_utils import generate_caption


# class UploadedImageViewSet(viewsets.ModelViewSet):
#     queryset = UploadedImage.objects.all().order_by('-created_at')
#     serializer_class = UploadedImageSerializer

#     def create(self, request, *args, **kwargs):
#         # validate input
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         instance = serializer.save()

#         # 🟢 Generate caption with BLIP instead of dummy answer
#         try:
#             caption = generate_caption(instance.image.path)
#             instance.answer = caption  # store caption as the "answer"
#         except Exception as e:
#             instance.answer = f"Error generating caption: {str(e)}"

#         instance.save()

#         # return full object with generated answer
#         data = UploadedImageSerializer(instance).data
#         return Response(data, status=status.HTTP_201_CREATED)


# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from .models import UploadedImage
# from .serializers import UploadedImageSerializer

# # Import both functions from ml_utils
# from .ml_utils import generate_caption, generate_answer


# class UploadedImageViewSet(viewsets.ModelViewSet):
#     queryset = UploadedImage.objects.all().order_by('-created_at')
#     serializer_class = UploadedImageSerializer

#     def create(self, request, *args, **kwargs):
#         # Validate the uploaded data
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         instance = serializer.save()

#         try:
#             # Step 1: Generate a caption for the uploaded image
#             caption = generate_caption(instance.image.path)

#             # Step 2: Generate an answer using the caption + user's question
#             answer = generate_answer(instance.question, caption)

#             # Save the generated answer
#             instance.answer = answer
#             instance.save()

#             # Prepare data for response
#             data = UploadedImageSerializer(instance).data
#             return Response(data, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             # In case any error occurs, send error message
#             instance.answer = f"Error: {str(e)}"
#             instance.save()
#             data = UploadedImageSerializer(instance).data
#             return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from .models import UploadedImage
# from .serializers import UploadedImageSerializer

# # Import both functions from ml_utils
# from .ml_utils import generate_caption, generate_answer


# class UploadedImageViewSet(viewsets.ModelViewSet):
#     queryset = UploadedImage.objects.all().order_by('-created_at')
#     serializer_class = UploadedImageSerializer

#     def create(self, request, *args, **kwargs):
#         # Validate the uploaded data
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         instance = serializer.save()

#         try:
#             # 🖼 Step 1: Generate a caption for the uploaded image
#             caption = generate_caption(instance.image.path)

#             # 💬 Step 2: Generate an intelligent answer using image + question
#             if instance.question:
#                 answer = generate_answer(instance.image.path, instance.question)
#             else:
#                 # If no question provided, just return caption as answer
#                 answer = caption

#             # Save the generated answer
#             instance.answer = answer
#             instance.save()

#             # Return full response
#             data = UploadedImageSerializer(instance).data
#             return Response(data, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             # In case any error occurs, send error message
#             instance.answer = f"Error: {str(e)}"
#             instance.save()
#             data = UploadedImageSerializer(instance).data
#             return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from .models import UploadedImage
# from .serializers import UploadedImageSerializer

# # Import functions from ml_utils
# from .ml_utils import generate_caption, generate_answer


# class UploadedImageViewSet(viewsets.ModelViewSet):
#     queryset = UploadedImage.objects.all().order_by('-created_at')
#     serializer_class = UploadedImageSerializer

#     def create(self, request, *args, **kwargs):
#         # Validate and save uploaded data
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         instance = serializer.save()

#         try:
#             # 🖼 Step 1: Generate a caption (optional but useful)
#             caption = generate_caption(instance.image.path)

#             # 💬 Step 2: Generate an intelligent answer using image + question
#             if instance.question:
#                 # Note: generate_answer(image_path, question)
#                 answer = generate_answer(instance.image.path, instance.question)
#             else:
#                 # If no question provided, just use the caption
#                 answer = caption

#             # Combine caption + answer for better clarity
#             instance.answer = answer
#             instance.save()

#             # ✅ Return full response with generated data
#             data = UploadedImageSerializer(instance).data
#             return Response(data, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             # ⚠️ Handle any runtime errors gracefully
#             instance.answer = f"Error: {str(e)}"
#             instance.save()
#             data = UploadedImageSerializer(instance).data
#             return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from .models import UploadedImage
# from .serializers import UploadedImageSerializer

# # Import your ML utility functions
# from .ml_utils import generate_caption, generate_answer


# class UploadedImageViewSet(viewsets.ModelViewSet):
#     queryset = UploadedImage.objects.all().order_by('-created_at')
#     serializer_class = UploadedImageSerializer

#     def create(self, request, *args, **kwargs):
#         # ✅ Step 1: Validate and save uploaded image + question
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         instance = serializer.save()

#         try:
#             image_path = instance.image.path

#             # 🧠 Step 2: Generate caption (optional, good fallback)
#             caption = generate_caption(image_path)

#             # 💬 Step 3: Generate answer (if question provided)
#             if instance.question:
#                 answer = generate_answer(image_path, instance.question)
#             else:
#                 answer = caption  # fallback to caption if no question

#             # 💾 Step 4: Save the generated answer
#             instance.answer = answer
#             instance.save(update_fields=["answer"])

#             # 🚀 Step 5: Return serialized data
#             return Response(
#                 UploadedImageSerializer(instance).data,
#                 status=status.HTTP_201_CREATED
#             )

#         except Exception as e:
#             # ❌ Step 6: Handle errors gracefully
#             instance.answer = f"Error: {str(e)}"
#             instance.save(update_fields=["answer"])
#             return Response(
#                 {"error": str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from .models import UploadedImage
# from .serializers import UploadedImageSerializer

# # ✅ Import your BLIP + FLAN-T5 functions from api/vqa.py
# from .api.vqa import generate_caption, generate_answer


# class UploadedImageViewSet(viewsets.ModelViewSet):
#     queryset = UploadedImage.objects.all().order_by('-created_at')
#     serializer_class = UploadedImageSerializer

#     def create(self, request, *args, **kwargs):
#         """
#         Handles image upload + question.
#         Generates caption and/or answer using BLIP + FLAN-T5.
#         """
#         # ✅ Step 1: Validate and save uploaded image + question
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         instance = serializer.save()

#         try:
#             image_path = instance.image.path

#             # 🧠 Step 2: Generate caption (optional, fallback)
#             caption = generate_caption(image_path)

#             # 💬 Step 3: Generate answer (if question provided)
#             if instance.question:
#                 answer = generate_answer(image_path, instance.question)
#             else:
#                 answer = caption  # fallback to caption if no question

#             # 💾 Step 4: Save the generated answer
#             instance.answer = answer
#             instance.save(update_fields=["answer"])

#             # 🚀 Step 5: Return serialized data
#             return Response(
#                 UploadedImageSerializer(instance).data,
#                 status=status.HTTP_201_CREATED
#             )

#         except Exception as e:
#             # ❌ Step 6: Handle errors gracefully
#             instance.answer = f"Error: {str(e)}"
#             instance.save(update_fields=["answer"])
#             return Response(
#                 {"error": str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )


# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from .models import UploadedImage
# from .serializers import UploadedImageSerializer
# from .api.vqa import generate_caption, generate_answer


# class UploadedImageViewSet(viewsets.ModelViewSet):
#     queryset = UploadedImage.objects.all().order_by('-created_at')
#     serializer_class = UploadedImageSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         instance = serializer.save()

#         try:
#             image_path = instance.image.path

#             caption = generate_caption(image_path)

#             if instance.question:
#                 answer = generate_answer(image_path, instance.question)
#             else:
#                 answer = caption

#             instance.answer = answer
#             instance.save(update_fields=["answer"])

#             return Response(
#                 UploadedImageSerializer(instance).data,
#                 status=status.HTTP_201_CREATED
#             )

#         except Exception as e:
#             instance.answer = f"Error: {str(e)}"
#             instance.save(update_fields=["answer"])
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# # core/views.py

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from django.core.files.storage import default_storage

# # ✅ Import helper functions safely (no circular import now)
# from core.api.vqa import generate_caption, generate_answer, detect_language

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

#             # 🧠 Generate appropriate response
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

# import os
# from django.conf import settings
# from core.utils.pdf_generator import create_vqa_pdf   # name from your long helper earlier
# from core.utils.pdf_generator import generate_pdf
# from rest_framework import viewsets, status
# from rest_framework.views import APIView
# from rest_framework.response import Response

# from .models import UploadedImage
# from .serializers import UploadedImageSerializer

# # Import helpers from your ML functions
# from core.api.vqa import generate_caption, generate_answer, detect_language


# # ✅ ViewSet for handling image uploads via Django REST Framework
# class UploadedImageViewSet(viewsets.ModelViewSet):
#     queryset = UploadedImage.objects.all().order_by('-created_at')
#     serializer_class = UploadedImageSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         instance = serializer.save()

#         try:
#             image_path = instance.image.path
#             question = instance.question.strip() if instance.question else ""
#             detected_lang = detect_language(question) if question else "en"

#             # Generate caption or answer depending on user input
#             if question:
#                 answer = generate_answer(image_path, question, target_lang=detected_lang)
#             else:
#                 answer = generate_caption(image_path, target_lang=detected_lang)

#             instance.answer = answer
#             instance.save(update_fields=["answer"])

#             return Response(UploadedImageSerializer(instance).data, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             instance.answer = f"Error: {str(e)}"
#             instance.save(update_fields=["answer"])
        
#             pdfs_dir = os.path.join(settings.MEDIA_ROOT, "pdfs")
#             os.makedirs(pdfs_dir, exist_ok=True)
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# # ✅ Optional: VQA API endpoint for text + image Q&A directly
# class VQAAPIView(APIView):
#     """
#     This class allows direct Visual Question Answering through an API endpoint
#     without needing to save it as a database entry.
#     """

#     def post(self, request, *args, **kwargs):
#         try:
#             image = request.FILES.get('image')
#             question = request.data.get('question', '').strip()

#             if not image:
#                 return Response({"error": "Image file is required."}, status=status.HTTP_400_BAD_REQUEST)

#             # Save image temporarily
#             image_path = image.temporary_file_path() if hasattr(image, 'temporary_file_path') else None
#             if not image_path:
#                 import tempfile
#                 with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
#                     for chunk in image.chunks():
#                         tmp.write(chunk)
#                     image_path = tmp.name

#             detected_lang = detect_language(question) if question else "en"

#             if question:
#                 answer = generate_answer(image_path, question, target_lang=detected_lang)
#             else:
#                 answer = generate_caption(image_path, target_lang=detected_lang)

#             return Response({"answer": answer}, status=status.HTTP_200_OK)

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


import os
from django.conf import settings

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import UploadedImage
from .serializers import UploadedImageSerializer

# ✅ ML helpers
from core.api.vqa import generate_caption, generate_answer, detect_language

# ✅ PDF helper (ONLY THIS ONE)
from core.utils.pdf_generator import generate_pdf


# =========================================================
# ✅ ViewSet: Upload Image + Question → Answer → PDF
# =========================================================
class UploadedImageViewSet(viewsets.ModelViewSet):
    queryset = UploadedImage.objects.all().order_by('-created_at')
    serializer_class = UploadedImageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        try:
            # -------------------------------------------------
            # 1️⃣ Get image + question
            # -------------------------------------------------
            image_path = instance.image.path
            question = instance.question.strip() if instance.question else ""

            # -------------------------------------------------
            # 2️⃣ Detect language
            # -------------------------------------------------
            detected_lang = detect_language(question) if question else "en"

            # -------------------------------------------------
            # 3️⃣ Generate answer or caption
            # -------------------------------------------------
            if question:
                answer = generate_answer(
                    image_path=image_path,
                    question=question,
                    target_lang=detected_lang
                )
            else:
                answer = generate_caption(
                    image_path=image_path,
                    target_lang=detected_lang
                )

            # -------------------------------------------------
            # 4️⃣ Save answer in DB
            # -------------------------------------------------
            instance.answer = answer
            instance.save(update_fields=["answer"])

            # -------------------------------------------------
            # 5️⃣ Generate PDF
            # -------------------------------------------------
            pdf_filename = generate_pdf(
                image_path=image_path,
                question=question,
                answer=answer
            )

            # -------------------------------------------------
            # 6️⃣ Response with PDF link
            # -------------------------------------------------
            response_data = UploadedImageSerializer(instance).data
            response_data["pdf_url"] = settings.MEDIA_URL + pdf_filename

            return Response(response_data, status=status.HTTP_201_CREATED)

        except Exception as e:
            instance.answer = f"Error: {str(e)}"
            instance.save(update_fields=["answer"])
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# =========================================================
# ✅ Direct VQA API (NO DB, NO PDF)
# =========================================================
class VQAAPIView(APIView):
    """
    Direct Visual Question Answering API
    (Does NOT save to database, does NOT generate PDF)
    """

    def post(self, request, *args, **kwargs):
        try:
            image = request.FILES.get("image")
            question = request.data.get("question", "").strip()

            if not image:
                return Response(
                    {"error": "Image file is required."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Save image temporarily
            if hasattr(image, "temporary_file_path"):
                image_path = image.temporary_file_path()
            else:
                import tempfile
                with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
                    for chunk in image.chunks():
                        tmp.write(chunk)
                    image_path = tmp.name

            detected_lang = detect_language(question) if question else "en"

            if question:
                answer = generate_answer(
                    image_path=image_path,
                    question=question,
                    target_lang=detected_lang
                )
            else:
                answer = generate_caption(
                    image_path=image_path,
                    target_lang=detected_lang
                )

            return Response({"answer": answer}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
