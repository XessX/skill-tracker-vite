import SkillItem from "./SkillItem";
import { AnimatePresence } from "framer-motion";

function SkillList({ skills, onRemoveSkill }) {
  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {skills.map((skill) => (
          <SkillItem
            key={skill.id}
            skill={skill}
            onRemove={() => onRemoveSkill(skill.id)}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default SkillList;
