 import { Editor } from "primereact/editor";

interface BasicDemoProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BasicDemo({ value, onChange }: BasicDemoProps) {
  return (
    <div className="card">
      <Editor
        value={value}
        onTextChange={(e) => onChange(e.htmlValue ?? '')}
        style={{ height: '200px' }}
      />
    </div>
  );
}
