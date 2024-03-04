import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function InformationPage() {

  return (
    <Accordion className="p-2" type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>What does TableHarmony do ?</AccordionTrigger>
        <AccordionContent>
          TableHarmony offers project management, code editing, and a social environment.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What was used to build the front-end ?</AccordionTrigger>
        <AccordionContent>
          The front-end was built using React and Next.js.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What was used to build the back-end ?</AccordionTrigger>
        <AccordionContent>
          The back-end was built using Node.js with Prisma middleware connected to a MongoDB database.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}