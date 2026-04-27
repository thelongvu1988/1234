import { create } from 'zustand'
import type { CandidateInfo } from '../types/candidate.type'

interface CandidateState {
  candidate: CandidateInfo | null
  setCandidate: (candidate: CandidateInfo) => void
  clearCandidate: () => void
}

const STORAGE_KEY = 'bca_candidate_info'

const getInitialCandidate = (): CandidateInfo | null => {
  if (typeof window === 'undefined') return null

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const useCandidateStore = create<CandidateState>((set) => ({
  candidate: getInitialCandidate(),

  setCandidate: (candidate) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidate))
    set({ candidate })
  },

  clearCandidate: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ candidate: null })
  },
}))