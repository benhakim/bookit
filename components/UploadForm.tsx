"use client"
import React, { useState, useRef } from 'react'
import { Upload, Image, X } from 'lucide-react'
import { voiceOptions } from '@/lib/constans'

const UploadForm = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [selectedVoice, setSelectedVoice] = useState('rachel')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const pdfInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPdfFile(file)
      setErrors(prev => ({ ...prev, pdf: '' }))
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      setErrors(prev => ({ ...prev, cover: '' }))
    }
  }

  const removePdf = () => {
    setPdfFile(null)
    if (pdfInputRef.current) pdfInputRef.current.value = ''
  }

  const removeCover = () => {
    setCoverFile(null)
    if (coverInputRef.current) coverInputRef.current.value = ''
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!pdfFile) newErrors.pdf = 'PDF file is required'
    if (!title.trim()) newErrors.title = 'Title is required'
    if (!author.trim()) newErrors.author = 'Author is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
  }

  const maleVoices = Object.entries(voiceOptions).filter(([key]) => ['dave', 'daniel', 'chris'].includes(key))
  const femaleVoices = Object.entries(voiceOptions).filter(([key]) => ['rachel', 'sarah'].includes(key))

  return (
    <div className="new-book-wrapper">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Upload PDF</label>
          <div
            className="upload-dropzone border-dashed border-2 border-[rgba(33,42,59,0.2)]"
            onClick={() => pdfInputRef.current?.click()}
          >
            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handlePdfChange}
            />
            {pdfFile ? (
              <div className="flex items-center justify-between w-full px-4">
                <span className="text-sm font-medium text-[var(--text-primary)]">{pdfFile.name}</span>
                <button
                  type="button"
                  className="upload-dropzone-remove"
                  onClick={(e) => {
                    e.stopPropagation()
                    removePdf()
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
          {errors.pdf && <p className="text-sm text-red-500 mt-1">{errors.pdf}</p>}
        </div>

        <div>
          <label className="form-label">Cover Image</label>
          <div
            className="upload-dropzone border-dashed border-2 border-[rgba(33,42,59,0.2)]"
            onClick={() => coverInputRef.current?.click()}
          >
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
            {coverFile ? (
              <div className="flex items-center justify-between w-full px-4">
                <span className="text-sm font-medium text-[var(--text-primary)]">{coverFile.name}</span>
                <button
                  type="button"
                  className="upload-dropzone-remove"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeCover()
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <>
                <Image className="upload-dropzone-icon" aria-hidden="true" />
                <span className="upload-dropzone-text">Click to upload cover image</span>
                <span className="upload-dropzone-hint">Leave empty to auto-generate from PDF</span>
              </>
            )}
          </div>
        </div>

        <div>
          <label className="form-label" htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="ex: Rich Dad Poor Dad"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setErrors(prev => ({ ...prev, title: '' }))
            }}
          />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="form-label" htmlFor="author">Author Name</label>
          <input
            id="author"
            type="text"
            className="form-input"
            placeholder="ex: Robert Kiyosaki"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value)
              setErrors(prev => ({ ...prev, author: '' }))
            }}
          />
          {errors.author && <p className="text-sm text-red-500 mt-1">{errors.author}</p>}
        </div>

        <div>
          <label className="form-label">Choose Assistant Voice</label>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">Male Voices</p>
              <div className="voice-selector-options">
                {maleVoices.map(([key, voice]) => (
                  <div
                    key={key}
                    className={`voice-selector-option ${selectedVoice === key ? 'voice-selector-option-selected' : 'voice-selector-option-default'}`}
                    onClick={() => setSelectedVoice(key)}
                  >
                    <input type="radio" name="voice" value={key} checked={selectedVoice === key} className="hidden" readOnly />
                    <div>
                      <p className="font-medium">{voice.name}</p>
                      <p className="text-sm text-[var(--text-muted)]">{voice.description}</p>
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
                    className={`voice-selector-option ${selectedVoice === key ? 'voice-selector-option-selected' : 'voice-selector-option-default'}`}
                    onClick={() => setSelectedVoice(key)}
                  >
                    <input type="radio" name="voice" value={key} checked={selectedVoice === key} className="hidden" readOnly />
                    <div>
                      <p className="font-medium">{voice.name}</p>
                      <p className="text-sm text-[var(--text-muted)]">{voice.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <button type="submit" className="form-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Synthesizing...' : 'Begin Synthesis'}
          </button>
        </div>
      </form>

      {isSubmitting && (
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
