import { useGetFormFieldQuery } from "@/api/dynamic-form.api";
import { SmModules } from "@/api/types";
import Designer from "@/components/dynamic-form/Designer";
import DragOverlayWrapper from "@/components/dynamic-form/DragOverlayWrapper";
import { SaveFormBtn } from "@/components/dynamic-form/SaveFormBtn";
import useDesigner from "@/hooks/useDesigner";
import { AppForms } from "@/types";
import { formatStatusEnum } from "@/utils/formatEnum";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";

interface Props {
  module: SmModules;
}

const FormBuilder = ({ module }: Props) => {
  const { addElement } = useDesigner();

  const [formName, setFormName] = useState(AppForms.REQUEST_SURVEY);

  const { data: formContent } = useGetFormFieldQuery({
    module,
    type: formName,
  });

  useEffect(() => {
    if (formContent) {
      const content = JSON.parse(formContent.content);
      content.map((c: any, idx: number) => addElement(idx, c));
    }
  }, [formName]);

  useEffect(() => {}, [formName]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col h-screen">
        <div className="flex items-center justify-between gap-3 p-4 border-b-2">
          <h2>
            <span className="text-xl font-bold">
              {formatStatusEnum(formName)}
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <SaveFormBtn module={module} type={formName} />
          </div>
        </div>
        <div
          className="relative flex items-center justify-center flex-grow w-full overflow-y-auto "
          style={{
            background: "url('/assets/paper.svg')",
          }}
        >
          <Designer setFormName={setFormName} module={module} />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
