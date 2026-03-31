import { create } from 'zustand'
import type { Track, Stage, AuditLead } from '@/types/audit'

interface AuditStore {
  track:          Track | null
  stage:          Stage
  questionIndex:  number
  answers:        Record<number, number>
  lead:           AuditLead | null
  submissionId:   string | null

  setTrack:        (track: Track) => void
  setStage:        (stage: Stage) => void
  setAnswer:       (id: number, value: number) => void
  setLead:         (lead: AuditLead) => void
  setSubmissionId: (id: string) => void
  nextQuestion:    () => void
  prevQuestion:    () => void
  reset:           () => void
}

const initialState = {
  track:         null as Track | null,
  stage:         'landing' as Stage,
  questionIndex: 0,
  answers:       {} as Record<number, number>,
  lead:          null as AuditLead | null,
  submissionId:  null as string | null,
}

export const useAuditStore = create<AuditStore>((set, get) => ({
  ...initialState,

  setTrack: (track) => set({ track, stage: 'quiz', questionIndex: 0 }),

  setStage: (stage) => set({ stage }),

  setAnswer: (id, value) =>
    set(s => ({ answers: { ...s.answers, [id]: value } })),

  setLead: (lead) => set({ lead }),

  setSubmissionId: (id) => set({ submissionId: id }),

  nextQuestion: () => {
    const { questionIndex, stage } = get()
    // Coming from mid_hook → advance to Q5 (index 4)
    if (stage === 'mid_hook') {
      set({ stage: 'quiz', questionIndex: 4 })
      return
    }
    // After Q4 (index 3) → mid hook
    if (questionIndex === 3) {
      set({ stage: 'mid_hook' })
      return
    }
    // After Q8 (index 7) → lead capture
    if (questionIndex === 7) {
      set({ stage: 'capture' })
      return
    }
    set({ questionIndex: questionIndex + 1, stage: 'quiz' })
  },

  prevQuestion: () => {
    const { questionIndex, stage } = get()
    if (stage === 'mid_hook') {
      set({ stage: 'quiz', questionIndex: 3 })
      return
    }
    if (stage === 'capture') {
      set({ stage: 'quiz', questionIndex: 7 })
      return
    }
    if (questionIndex === 0) {
      set({ stage: 'track_select' })
      return
    }
    set({ questionIndex: questionIndex - 1 })
  },

  reset: () => set(initialState),
}))
