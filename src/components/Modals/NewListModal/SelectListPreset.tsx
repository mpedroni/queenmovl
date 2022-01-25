import { useState } from 'react';

type ListPreset = {
  id: number;
  name: string;
};

interface SelectListPresetProps {
  presets: ListPreset[];
  onSelectPreset: (preset: string) => void;
}

export function SelectListPreset({
  presets,
  onSelectPreset,
}: SelectListPresetProps) {
  return (
    <div>
      <div className="mb-2 text-sm font-bold text-body">
        Qual modelo de lista deseja utilizar?
      </div>
      <select
        className="w-full h-8 px-2 mb-2 bg-gray-700 rounded-md outline-none text-body"
        defaultValue=""
        onChange={(e) => onSelectPreset(e.currentTarget.value)}
      >
        <option value="">Personalizado</option>

        {presets.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.name}
          </option>
        ))}
      </select>
    </div>
  );
}
