import { create } from 'zustand'

const STUDY_STORAGE_KEY = 'gplx_study_store_v1'

type StudyState = {
  license: string | null
  currentIndex: number

  learned: Record<string, number[]>
  favorites: Record<string, number[]>
  wrong: Record<string, Record<number, number>>

  setLicense: (license: string | null) => void
  setIndex: (index: number) => void

  markLearned: (questionId: number) => void
  toggleFavorite: (questionId: number) => void
  markWrong: (questionId: number) => void
}

const loadStudyState = () => {
  if (typeof window === 'undefined') {
    return {
      license: null,
      currentIndex: 0,
      learned: {},
      favorites: {},
      wrong: {},
    }
  }

  try {
    const raw = localStorage.getItem(STUDY_STORAGE_KEY)

    if (!raw) {
      return {
        license: null,
        currentIndex: 0,
        learned: {},
        favorites: {},
        wrong: {},
      }
    }

    const parsed = JSON.parse(raw)

    return {
      license: parsed.license || null,
      currentIndex: parsed.currentIndex || 0,
      learned: parsed.learned || {},
      favorites: parsed.favorites || {},
      wrong: parsed.wrong || {},
    }
  } catch {
    return {
      license: null,
      currentIndex: 0,
      learned: {},
      favorites: {},
      wrong: {},
    }
  }
}

const saveStudyState = (state: Partial<StudyState>) => {
  if (typeof window === 'undefined') return

  const data = {
    license: state.license ?? null,
    currentIndex: state.currentIndex ?? 0,
    learned: state.learned ?? {},
    favorites: state.favorites ?? {},
    wrong: state.wrong ?? {},
  }

  localStorage.setItem(STUDY_STORAGE_KEY, JSON.stringify(data))
}

const initialState = loadStudyState()

export const useStudyStore = create<StudyState>((set, get) => ({
  license: initialState.license,
  currentIndex: initialState.currentIndex,

  learned: initialState.learned,
  favorites: initialState.favorites,
  wrong: initialState.wrong,

  setLicense: (license) => {
    const nextState = {
      ...get(),
      license,
      currentIndex: 0,
    }

    saveStudyState(nextState)

    set({
      license,
      currentIndex: 0,
    })
  },

  setIndex: (index) => {
    const nextState = {
      ...get(),
      currentIndex: index,
    }

    saveStudyState(nextState)

    set({ currentIndex: index })
  },

  markLearned: (questionId) => {
    const { license, learned } = get()
    if (!license) return

    const currentList = learned[license] || []

    if (currentList.includes(questionId)) return

    const nextLearned = {
      ...learned,
      [license]: [...currentList, questionId],
    }

    const nextState = {
      ...get(),
      learned: nextLearned,
    }

    saveStudyState(nextState)

    set({
      learned: nextLearned,
    })
  },

  toggleFavorite: (questionId) => {
    const { license, favorites } = get()
    if (!license) return

    const currentList = favorites[license] || []
    const isFavorite = currentList.includes(questionId)

    const nextFavorites = {
      ...favorites,
      [license]: isFavorite
        ? currentList.filter((id) => id !== questionId)
        : [...currentList, questionId],
    }

    const nextState = {
      ...get(),
      favorites: nextFavorites,
    }

    saveStudyState(nextState)

    set({
      favorites: nextFavorites,
    })
  },

  markWrong: (questionId) => {
    const { license, wrong } = get()
    if (!license) return

    const currentMap = wrong[license] || {}

    const nextWrong = {
      ...wrong,
      [license]: {
        ...currentMap,
        [questionId]: (currentMap[questionId] || 0) + 1,
      },
    }

    const nextState = {
      ...get(),
      wrong: nextWrong,
    }

    saveStudyState(nextState)

    set({
      wrong: nextWrong,
    })
  },
}))