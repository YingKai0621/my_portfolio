"use client";

import { useState } from "react";

import { CapabilityIconCloud } from "@/components/sections/capability-icon-cloud";
import { TechnologyLogos, type TechnologyMark } from "@/components/sections/technology-logos";
import { primaryMarks } from "@/content/expertise";

type Capability = {
  key: string;
  name: string;
  marks: readonly TechnologyMark[];
};

type Props = {
  items: readonly Capability[];
  allMarks: readonly TechnologyMark[];
  introduction: {
    headingFirst: string;
    headingSecond: string;
    heading: string;
    description: string;
    evidence: string;
  };
  inventoryHeading: string;
  labels: {
    cloud: string;
    cloudKeyboard: string;
    pause: string;
    resume: string;
  };
};

export function CapabilityExplorer({ items, allMarks, introduction, inventoryHeading, labels }: Props) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [keyboardSelection, setKeyboardSelection] = useState(false);
  const active = items.find((item) => item.key === activeKey);

  return (
    <div className="expertise-explorer" data-keyboard-selection={keyboardSelection}>
      <div className="expertise-feature">
        <div className="expertise-feature-copy">
          <h2 className="engineering-research-title" id="engineering-research-title">
            <span>{introduction.headingFirst}</span><span>{introduction.headingSecond}</span>
          </h2>
          <h3>{introduction.heading}</h3>
          <p className="expertise-feature-description">{introduction.description}</p>
          <p className="expertise-feature-evidence">{introduction.evidence}</p>
        </div>
        <div className="expertise-visual">
          <div className="expertise-blueprint" aria-hidden="true" />
          <CapabilityIconCloud
            marks={allMarks}
            activeMarks={active?.marks ?? primaryMarks}
            cloudLabel={labels.cloud}
            keyboardHint={labels.cloudKeyboard}
            pauseLabel={labels.pause}
            resumeLabel={labels.resume}
          />
        </div>
      </div>

      <section className="expertise-inventory" aria-labelledby="expertise-inventory-title">
        <h3 className="expertise-inventory-heading" id="expertise-inventory-title">{inventoryHeading}</h3>
        <div className="expertise-groups">
          {items.map((item) => (
            <article className="expertise-group" data-active={item.key === activeKey} key={item.key}>
              <h4>
                <button
                  type="button"
                  aria-pressed={item.key === activeKey}
                  onClick={(event) => {
                    setKeyboardSelection(event.detail === 0);
                    setActiveKey(item.key === activeKey ? null : item.key);
                  }}
                >
                  <span>{item.name}</span>
                </button>
              </h4>
              <TechnologyLogos marks={item.marks} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
