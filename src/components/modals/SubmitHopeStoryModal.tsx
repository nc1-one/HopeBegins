'use client';

import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Heart, Upload, X } from 'lucide-react';
import Image from 'next/image';
import hopeStoryService from '@/services/hopeStoryService';
import { noTl, type PerLangNoTl } from '@/lib/i18n';
import { usePageLanguage } from '@/lib/pageLanguage';

const MAX_WORDS = 200;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

interface StoryCopy {
  title: string;
  description: string;
  nameLabel: string;
  /** Each country's "John Doe". */
  namePlaceholder: string;
  occupationLabel: string;
  occupationPlaceholder: string;
  storyLabel: string;
  words: (count: number, max: number) => string;
  storyPlaceholder: string;
  photoLabel: string;
  addPhoto: string;
  photoHint: string;
  preview: string;
  removePhoto: string;
  sending: string;
  send: string;
  cancel: string;
  thanks: string;
  failed: string;
  nameTooShort: string;
  storyTooShort: string;
  storyTooLong: (max: number) => string;
  photoTooBig: string;
  photoType: string;
}

const copy: PerLangNoTl<StoryCopy> = {
  en: {
    title: 'Share your story',
    description: 'How did HopeBegins help you? Tell us in your own words.',
    nameLabel: 'Name to show',
    namePlaceholder: 'Juan dela Cruz',
    occupationLabel: 'Occupation (optional)',
    occupationPlaceholder: 'Teacher, student, nurse',
    storyLabel: 'Your story',
    words: (count, max) => `${count}/${max} words`,
    storyPlaceholder: 'Write it here',
    photoLabel: 'Photo (optional)',
    addPhoto: 'Tap to add a photo',
    photoHint: 'Portrait photos work best (up to 5 MB)',
    preview: 'Preview',
    removePhoto: 'Remove photo',
    sending: 'Sending…',
    send: 'Send my story',
    cancel: 'Cancel',
    thanks: "Thank you. We'll read it before it goes up.",
    failed: "Your story didn't go through. Please try again.",
    nameTooShort: 'Name must be at least 2 characters',
    storyTooShort: 'Please write at least 10 characters.',
    storyTooLong: (max) => `Please keep it to ${max} words or fewer.`,
    photoTooBig: 'That photo is too big. Please use one under 5 MB.',
    photoType: 'Please use a JPG, PNG or WebP photo.',
  },
  fr: {
    title: 'Partage ton histoire',
    description:
      'Qu’est-ce que HopeBegins t’a apporté ? Raconte-le-nous avec tes propres mots.',
    nameLabel: 'Nom affiché',
    namePlaceholder: 'Jean Dupont',
    occupationLabel: 'Métier (facultatif)',
    occupationPlaceholder: 'Enseignante, étudiant, infirmier',
    storyLabel: 'Ton histoire',
    words: (count, max) => `${count}/${max} mots`,
    storyPlaceholder: 'Écris-la ici',
    photoLabel: 'Photo (facultative)',
    addPhoto: 'Appuie pour ajouter une photo',
    photoHint: 'Les photos au format portrait rendent le mieux (5 Mo maximum)',
    preview: 'Aperçu',
    removePhoto: 'Retirer la photo',
    sending: 'Envoi en cours…',
    send: 'Envoyer mon histoire',
    cancel: 'Annuler',
    thanks: 'Merci. Nous la lirons avant de la publier.',
    failed: 'Ton histoire n’a pas pu être envoyée. Réessaie, s’il te plaît.',
    nameTooShort: 'Le nom doit contenir au moins 2 caractères',
    storyTooShort: 'Écris au moins 10 caractères, s’il te plaît.',
    storyTooLong: (max) => `Pas plus de ${max} mots, s’il te plaît.`,
    photoTooBig:
      'Cette photo est trop lourde. Choisis-en une de moins de 5 Mo.',
    photoType: 'Choisis une photo JPG, PNG ou WebP, s’il te plaît.',
  },
  de: {
    title: 'Erzähl deine Geschichte',
    description:
      'Wie hat HopeBegins dir geholfen? Erzähl es uns in deinen eigenen Worten.',
    nameLabel: 'Angezeigter Name',
    namePlaceholder: 'Max Mustermann',
    occupationLabel: 'Beruf (optional)',
    occupationPlaceholder: 'Lehrerin, Student, Pflegekraft',
    storyLabel: 'Deine Geschichte',
    words: (count, max) => `${count}/${max} Wörter`,
    storyPlaceholder: 'Schreib sie hier',
    photoLabel: 'Foto (optional)',
    addPhoto: 'Tippe, um ein Foto hinzuzufügen',
    photoHint: 'Fotos im Hochformat eignen sich am besten (bis 5 MB)',
    preview: 'Vorschau',
    removePhoto: 'Foto entfernen',
    sending: 'Wird gesendet…',
    send: 'Meine Geschichte senden',
    cancel: 'Abbrechen',
    thanks: 'Danke. Wir lesen sie, bevor sie online geht.',
    failed:
      'Deine Geschichte wurde nicht gesendet. Bitte versuch es noch einmal.',
    nameTooShort: 'Der Name braucht mindestens 2 Zeichen',
    storyTooShort: 'Bitte schreib mindestens 10 Zeichen.',
    storyTooLong: (max) => `Bitte schreib höchstens ${max} Wörter.`,
    photoTooBig: 'Das Foto ist zu groß. Bitte nimm eins unter 5 MB.',
    photoType: 'Bitte nimm ein Foto im Format JPG, PNG oder WebP.',
  },
  es: {
    title: 'Comparte tu historia',
    description:
      '¿Cómo te ayudó HopeBegins? Cuéntanoslo con tus propias palabras.',
    nameLabel: 'Nombre que se mostrará',
    namePlaceholder: 'Juan Pérez',
    occupationLabel: 'Ocupación (opcional)',
    occupationPlaceholder: 'Maestra, estudiante, enfermero',
    storyLabel: 'Tu historia',
    words: (count, max) => `${count}/${max} palabras`,
    storyPlaceholder: 'Escríbela aquí',
    photoLabel: 'Foto (opcional)',
    addPhoto: 'Toca para agregar una foto',
    photoHint: 'Las fotos verticales se ven mejor (hasta 5 MB)',
    preview: 'Vista previa',
    removePhoto: 'Quitar la foto',
    sending: 'Enviando…',
    send: 'Enviar mi historia',
    cancel: 'Cancelar',
    thanks: 'Gracias. La leeremos antes de publicarla.',
    failed: 'Tu historia no se pudo enviar. Inténtalo de nuevo, por favor.',
    nameTooShort: 'El nombre debe tener al menos 2 caracteres',
    storyTooShort: 'Escribe al menos 10 caracteres, por favor.',
    storyTooLong: (max) => `Usa ${max} palabras o menos, por favor.`,
    photoTooBig: 'Esa foto es demasiado grande. Usa una de menos de 5 MB.',
    photoType: 'Usa una foto JPG, PNG o WebP, por favor.',
  },
  ko: {
    title: '이야기를 들려주세요',
    description: 'HopeBegins가 어떻게 도움이 되었나요? 편한 말로 들려주세요.',
    nameLabel: '표시할 이름',
    namePlaceholder: '홍길동',
    occupationLabel: '직업(선택)',
    occupationPlaceholder: '교사, 학생, 간호사',
    storyLabel: '나의 이야기',
    words: (count, max) => `${count}/${max}단어`,
    storyPlaceholder: '여기에 써 주세요',
    photoLabel: '사진(선택)',
    addPhoto: '눌러서 사진 추가하기',
    photoHint: '세로 사진이 가장 잘 나와요(최대 5MB)',
    preview: '미리 보기',
    removePhoto: '사진 삭제',
    sending: '보내는 중…',
    send: '내 이야기 보내기',
    cancel: '취소',
    thanks: '고마워요. 게시하기 전에 먼저 읽어 볼게요.',
    failed: '이야기를 보내지 못했어요. 다시 시도해 주세요.',
    nameTooShort: '이름은 2자 이상이어야 해요',
    storyTooShort: '10자 이상 써 주세요.',
    storyTooLong: (max) => `${max}단어 이하로 써 주세요.`,
    photoTooBig: '사진이 너무 커요. 5MB 미만 사진을 사용해 주세요.',
    photoType: 'JPG, PNG, WebP 사진을 사용해 주세요.',
  },
};

// Built per language, so the form's messages are in the page's language.
const schemaFor = (t: StoryCopy) =>
  z.object({
    full_name: z.string().min(2, t.nameTooShort),
    occupation: z.string().optional(),
    testimonial: z
      .string()
      .min(10, t.storyTooShort)
      .refine((val) => val.split(/\s+/).filter(Boolean).length <= MAX_WORDS, {
        message: t.storyTooLong(MAX_WORDS),
      }),
    photo: z
      .any()
      .refine(
        (files) =>
          !files || files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
        t.photoTooBig
      )
      .refine(
        (files) =>
          !files ||
          files?.length === 0 ||
          ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        t.photoType
      )
      .optional(),
  });

type StoryForm = z.infer<ReturnType<typeof schemaFor>>;

interface SubmitHopeStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitHopeStoryModal({
  isOpen,
  onClose,
}: SubmitHopeStoryModalProps) {
  const lang = usePageLanguage();
  const t = noTl(copy, lang);
  const formSchema = useMemo(() => schemaFor(t), [t]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<StoryForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      occupation: '',
      testimonial: '',
    },
  });

  const testimonialValue = form.watch('testimonial') || '';
  const wordCount = testimonialValue.split(/\s+/).filter(Boolean).length;

  const onSubmit = async (values: StoryForm) => {
    try {
      setIsSubmitting(true);
      const data = {
        full_name: values.full_name,
        occupation: values.occupation,
        testimonial: values.testimonial,
        photo: values.photo?.[0],
      };

      await hopeStoryService.submitStory(data);
      toast.success(t.thanks);
      form.reset();
      setPreviewUrl(null);
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || t.failed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewUrl(null);
    form.setValue('photo', undefined);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.title}
      description={t.description}
      icon={<Heart className="h-6 w-6 text-rose-500 fill-rose-500" />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.nameLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.namePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.occupationLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.occupationPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="testimonial"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>{t.storyLabel}</FormLabel>
                  <span
                    className={`text-xs font-medium ${wordCount > MAX_WORDS ? 'text-red-500' : 'text-zinc-400'}`}
                  >
                    {t.words(wordCount, MAX_WORDS)}
                  </span>
                </div>
                <FormControl>
                  <Textarea
                    placeholder={t.storyPlaceholder}
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photo"
            render={({ field: { onChange, onBlur, name, ref } }) => (
              <FormItem>
                <FormLabel>{t.photoLabel}</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {!previewUrl ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-zinc-400 mb-2" />
                          <p className="text-sm text-zinc-500 font-medium">
                            {t.addPhoto}
                          </p>
                          <p className="text-xs text-zinc-400 mt-1">
                            {t.photoHint}
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          name={name}
                          ref={ref}
                          onBlur={onBlur}
                          accept={ACCEPTED_IMAGE_TYPES.join(',')}
                          onChange={(e) => {
                            handleImageChange(e);
                            onChange(e.target.files);
                          }}
                        />
                      </label>
                    ) : (
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden group border-2 border-zinc-100 dark:border-zinc-800">
                        <Image
                          src={previewUrl}
                          alt={t.preview}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          aria-label={t.removePhoto}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 text-white transition-opacity opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              className="w-full h-12 rounded-2xl text-base font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.sending : t.send}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full h-12 rounded-2xl text-zinc-500 font-medium"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {t.cancel}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
