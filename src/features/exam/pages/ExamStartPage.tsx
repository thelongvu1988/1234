import { ExamEntryForm } from '../components/ExamEntryForm'

interface Props {
  onStartExam: () => void
  onBack: () => void
}

export const ExamStartPage = ({ onStartExam }: Props) => {
  return <ExamEntryForm onStart={onStartExam} />
}