import { useState } from 'react';

type ListPreset = {
  id: number;
  name: string;
};

interface SelectListPresetProps {
  presets: ListPreset[];
  onSelectPreset: (preset: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function SelectListPreset({
  presets,
  onSelectPreset,
  onCancel,
  onConfirm,
}: SelectListPresetProps) {
  return (
    <div className="flex flex-col h-full">
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

      <div className="flex items-end justify-end gap-8 mt-auto mb-2">
        <button
          className="font-medium uppercase transition text-body hover:brightness-90"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="font-medium uppercase transition text-highlight hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:filter-none"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
