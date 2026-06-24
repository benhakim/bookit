"use client"
import React, { useState } from 'react'
import { Upload, Image as ImageIcon, X } from 'lucide-react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { voiceOptions, type VoiceOption } from '@/lib/constans'

const formSchema = z.object({
  pdf: z
    .custom<File>((val) => val instanceof File, {
      message: "PDF file is required",
    })
    .refine((file) => file.size <= 50 * 1024 * 1024, "PDF file (max 50MB)"),
  cover: z
    .custom<File | null>((val) => val === null || val instanceof File, {
      message: "Invalid file",
    })
    .optional()
    .refine(
      (file) => !file || file.size <= 10 * 1024 * 1024,
      "Cover image (max 10MB)"
    ),
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(1, "Author is required"),
  voice: z.string().min(1, "Please select a voice"),
})

type FormValues = z.infer<typeof formSchema>

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pdfPreview, setPdfPreview] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<File | null>(null)

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pdf: undefined as unknown as File,
      cover: null,
      title: '',
      author: '',
      voice: 'rachel',
    },
  })

  const { control, handleSubmit, formState: { isSubmitting: formIsSubmitting } } = methods

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('Form submitted:', data)
    setIsSubmitting(false)
  }

  const maleVoices = Object.entries(voiceOptions).filter(([key]) => ['dave', 'daniel', 'chris'].includes(key))
  const femaleVoices = Object.entries(voiceOptions).filter(([key]) => ['rachel', 'sarah'].includes(key))

  return (
    <div className="new-book-wrapper">
      <FormProvider {...methods}>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="pdf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload PDF</FormLabel>
                <FormControl>
                  <div
                    className="upload-dropzone border-dashed border-2 border-[rgba(33,42,59,0.2)]"
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.accept = 'application/pdf'
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) {
                          field.onChange(file)
                          setPdfPreview(file)
                        }
                      }
                      input.click()
                    }}
                  >
                    {pdfPreview || field.value ? (
                      <div className="flex items-center justify-between w-full px-4">
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                          {(pdfPreview || field.value)?.name}
                        </span>
                        <button
                          type="button"
                          className="upload-dropzone-remove"
                          onClick={(e) => {
                            e.stopPropagation()
                            field.onChange(null as unknown as File)
                            setPdfPreview(null)
                          }}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="upload-dropzone-icon" />
                        <span className="upload-dropzone-text">Click to upload PDF</span>
                        <span className="upload-dropzone-hint">PDF file (max 50MB)</span>
                      </>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <div
                    className="upload-dropzone border-dashed border-2 border-[rgba(33,42,59,0.2)]"
                    onClick={() => {
                      const input = document.createElement('input')
                      input.type = 'file'
                      input.accept = 'image/*'
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0]
                        if (file) {
                          field.onChange(file)
                          setCoverPreview(file)
                        }
                      }
                      input.click()
                    }}
                  >
                    {coverPreview || field.value ? (
                      <div className="flex items-center justify-between w-full px-4">
                        <span className="text-sm font-medium text-[var(--text-primary)]">
                          {(coverPreview || field.value)?.name}
                        </span>
                        <button
                          type="button"
                          className="upload-dropzone-remove"
                          onClick={(e) => {
                            e.stopPropagation()
                            field.onChange(null)
                            setCoverPreview(null)
                          }}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="upload-dropzone-icon" aria-hidden="true" />
                        <span className="upload-dropzone-text">Click to upload cover image</span>
                        <span className="upload-dropzone-hint">Leave empty to auto-generate from PDF</span>
                      </>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input id="title" placeholder="ex: Rich Dad Poor Dad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="author">Author Name</FormLabel>
                <FormControl>
                  <Input id="author" placeholder="ex: Robert Kiyosaki" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Choose Assistant Voice</FormLabel>
            <Controller
              control={control}
              name="voice"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="space-y-4"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Male Voices</p>
                    <div className="voice-selector-options">
                      {maleVoices.map(([key, voice]) => (
                        <div
                          key={key}
                          className={`voice-selector-option ${field.value === key ? 'voice-selector-option-selected' : 'voice-selector-option-default'}`}
                          onClick={() => field.onChange(key)}
                        >
                          <RadioGroupItem value={key} id={`male-${key}`} />
                          <div className="flex-1">
                            <p className="font-medium">{(voice as VoiceOption).name}</p>
                            <p className="text-sm text-[var(--text-muted)]">{(voice as VoiceOption).description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Female Voices</p>
                    <div className="voice-selector-options">
                      {femaleVoices.map(([key, voice]) => (
                        <div
                          key={key}
                          className={`voice-selector-option ${field.value === key ? 'voice-selector-option-selected' : 'voice-selector-option-default'}`}
                          onClick={() => field.onChange(key)}
                        >
                          <RadioGroupItem value={key} id={`female-${key}`} />
                          <div className="flex-1">
                            <p className="font-medium">{(voice as VoiceOption).name}</p>
                            <p className="text-sm text-[var(--text-muted)]">{(voice as VoiceOption).description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </RadioGroup>
              )}
            />
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormControl>
              <button type="submit" className="form-btn" disabled={formIsSubmitting}>
                {formIsSubmitting ? 'Synthesizing...' : 'Begin Synthesis'}
              </button>
            </FormControl>
          </FormItem>
        </form>
      </FormProvider>

      {(isSubmitting || formIsSubmitting) && (
        <div className="loading-wrapper">
          <div className="loading-shadow-wrapper">
            <div className="loading-shadow">
              <div className="loading-animation w-12 h-12 border-4 border-[var(--border-subtle)] border-t-[var(--accent-warm)] rounded-full" />
              <h3 className="loading-title">Creating your book...</h3>
              <div className="loading-progress">
                <div className="loading-progress-item">
                  <span className="loading-progress-status" />
                  <span>Analyzing PDF content</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadForm
