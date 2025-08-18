import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What services do you offer?",
    answer: "I offer a range of audio engineering services, including professional mixing, mastering, and full production packages. Each service is tailored to enhance the quality of your music and bring your artistic vision to life.",
  },
  {
    question: "What is your experience?",
    answer: "I have over 8 years of experience in the music industry, working with a diverse range of artists and genres. My work has garnered over 10 million streams across various platforms, and I am certified in both Logic Pro and FL Studio.",
  },
  {
    question: "What is the turnaround time for a project?",
    answer: "The standard turnaround time is 3-5 business days for mixing and 1-2 business days for mastering. I also offer expedited services for an additional fee if you need your project completed sooner.",
  },
  {
    question: "How do I send my files to you?",
    answer: "After placing an order, you will receive a link to a secure file-sharing service where you can upload your audio stems. Please ensure all files are properly labeled and in a high-quality format (WAV or AIFF).",
  },
  {
    question: "What if I'm not satisfied with the result?",
    answer: "Client satisfaction is my top priority. Each service includes up to one free revision to ensure you are completely happy with the final product. Additional revisions can be requested for a small fee.",
  },
]

export function Faq() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
