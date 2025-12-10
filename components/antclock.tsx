"use client";

import cx from "classnames";

type AntClockInfo = {
  framework: string;
  description: string;
  layers: {
    CE1: string;
    CE2: string;
    CE3: string;
  };
  operations: {
    curvature_walk: string;
    digit_mirror: string;
    pascal_curvature: string;
  };
  github: string;
  core_insight: string;
};

type DigitMirrorResult = {
  operation: "digit_mirror";
  input_digit: number;
  output_digit: number;
  formula: string;
  properties: {
    is_oscillating: boolean;
    is_fixed: boolean;
    oscillating_pairs: string;
    fixed_sector: string;
  };
  interpretation: string;
};

type PascalCurvatureResult = {
  operation: "pascal_curvature";
  n: number;
  curvature: number;
  formula: string;
  interpretation: string;
  context: string;
  note?: string;
};

type CurvatureWalkResult = {
  operation: "curvature_walk";
  parameters: {
    x0: number;
    chi_feg: number;
    steps: number;
  };
  results: {
    final_position: number;
    max_digit_shell: number;
    shell_transitions: number;
    mirror_transitions: number;
    bifurcation_index: number;
    trajectory_sample: number[];
  };
  interpretation: {
    summary: string;
    activity: string;
    max_shell_reached: string;
  };
  context: string;
};

type AntClockResult =
  | AntClockInfo
  | DigitMirrorResult
  | PascalCurvatureResult
  | CurvatureWalkResult
  | { error: string };

const ClockIcon = ({ size = 24 }: { size?: number }) => (
  <svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M12 6v6l4 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const MathIcon = ({ size = 24 }: { size?: number }) => (
  <svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
    <path
      d="M7 8l5 8m0-8l-5 8M3 4h18M3 20h18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

function isInfoResult(result: AntClockResult): result is AntClockInfo {
  return "framework" in result;
}

function isDigitMirrorResult(
  result: AntClockResult
): result is DigitMirrorResult {
  return "operation" in result && result.operation === "digit_mirror";
}

function isPascalCurvatureResult(
  result: AntClockResult
): result is PascalCurvatureResult {
  return "operation" in result && result.operation === "pascal_curvature";
}

function isCurvatureWalkResult(
  result: AntClockResult
): result is CurvatureWalkResult {
  return "operation" in result && result.operation === "curvature_walk";
}

function InfoDisplay({ data }: { data: AntClockInfo }) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-950/30">
        <div className="mb-1 font-semibold text-purple-900 text-sm dark:text-purple-100">
          {data.framework}
        </div>
        <div className="text-purple-800 text-xs dark:text-purple-200">
          {data.description}
        </div>
      </div>

      <div className="space-y-2">
        <div className="font-medium text-sm">Framework Layers</div>
        {Object.entries(data.layers).map(([key, value]) => (
          <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-900/30" key={key}>
            <div className="font-medium text-slate-900 text-xs dark:text-slate-100">
              {key}
            </div>
            <div className="text-slate-700 text-xs dark:text-slate-300">
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950/30">
        <div className="mb-1 font-medium text-blue-900 text-xs dark:text-blue-100">
          Core Insight
        </div>
        <div className="text-blue-800 text-xs dark:text-blue-200">
          {data.core_insight}
        </div>
      </div>

      <div className="pt-1 text-center text-slate-600 text-xs dark:text-slate-400">
        <a
          className="hover:underline"
          href={data.github}
          rel="noopener noreferrer"
          target="_blank"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}

function DigitMirrorDisplay({ data }: { data: DigitMirrorResult }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 font-bold text-2xl text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          {data.input_digit}
        </div>
        <div className="text-slate-400">
          <MathIcon size={24} />
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 font-bold text-2xl text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
          {data.output_digit}
        </div>
      </div>

      <div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-900/30">
        <div className="font-mono text-slate-700 text-sm dark:text-slate-300">
          {data.formula}
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
        <div className="text-blue-900 text-sm dark:text-blue-100">
          {data.interpretation}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-900/30">
          <div className="mb-0.5 font-medium text-slate-900 dark:text-slate-100">
            Oscillating Pairs
          </div>
          <div className="text-slate-700 dark:text-slate-300">
            {data.properties.oscillating_pairs}
          </div>
        </div>
        <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-900/30">
          <div className="mb-0.5 font-medium text-slate-900 dark:text-slate-100">
            Fixed Sector
          </div>
          <div className="text-slate-700 dark:text-slate-300">
            {data.properties.fixed_sector}
          </div>
        </div>
      </div>
    </div>
  );
}

function PascalCurvatureDisplay({ data }: { data: PascalCurvatureResult }) {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <div className="mb-1 text-slate-600 text-sm dark:text-slate-400">
          Row {data.n}
        </div>
        <div className="font-bold text-3xl text-slate-900 dark:text-slate-100">
          {data.curvature.toFixed(6)}
        </div>
        <div className="text-slate-600 text-xs dark:text-slate-400">
          curvature κₙ
        </div>
      </div>

      <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900/30">
        <div className="mb-1 font-medium text-slate-900 text-xs dark:text-slate-100">
          Formula
        </div>
        <div className="font-mono text-slate-700 text-xs dark:text-slate-300">
          {data.formula}
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
        <div className="text-blue-900 text-sm dark:text-blue-100">
          {data.interpretation}
        </div>
      </div>

      {data.note && (
        <div className="text-slate-600 text-xs dark:text-slate-400">
          {data.note}
        </div>
      )}

      <div className="text-slate-600 text-xs dark:text-slate-400">
        {data.context}
      </div>
    </div>
  );
}

function CurvatureWalkDisplay({ data }: { data: CurvatureWalkResult }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950/30">
          <div className="text-blue-600 text-xs dark:text-blue-400">
            Start
          </div>
          <div className="font-semibold text-blue-900 dark:text-blue-100">
            {data.parameters.x0.toFixed(2)}
          </div>
        </div>
        <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-950/30">
          <div className="text-purple-600 text-xs dark:text-purple-400">
            Steps
          </div>
          <div className="font-semibold text-purple-900 dark:text-purple-100">
            {data.parameters.steps}
          </div>
        </div>
        <div className="rounded-lg bg-indigo-50 p-2 dark:bg-indigo-950/30">
          <div className="text-indigo-600 text-xs dark:text-indigo-400">
            χ_FEG
          </div>
          <div className="font-semibold text-indigo-900 dark:text-indigo-100">
            {data.parameters.chi_feg.toFixed(3)}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900/30">
        <div className="mb-2 font-medium text-slate-900 text-sm dark:text-slate-100">
          Results
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">
              Final Position
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {data.results.final_position.toFixed(4)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">
              Max Digit Shell
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {data.results.max_digit_shell}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">
              Shell Transitions
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {data.results.shell_transitions}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">
              Mirror Transitions
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {data.results.mirror_transitions}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">
              Bifurcation Index
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {data.results.bifurcation_index.toFixed(4)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950/30">
          <div className="text-green-900 text-sm dark:text-green-100">
            {data.interpretation.summary}
          </div>
        </div>
        <div className="rounded-lg bg-amber-50 p-2 dark:bg-amber-950/30">
          <div className="text-amber-900 text-xs dark:text-amber-100">
            {data.interpretation.activity}
          </div>
        </div>
      </div>

      <div className="text-slate-600 text-xs dark:text-slate-400">
        {data.context}
      </div>
    </div>
  );
}

export function AntClock({
  antClockResult,
}: {
  antClockResult: AntClockResult;
}) {
  if ("error" in antClockResult) {
    return (
      <div className="rounded-2xl bg-red-50 p-4 shadow-lg dark:bg-red-950/30">
        <div className="text-red-900 text-sm dark:text-red-100">
          Error: {antClockResult.error}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cx(
        "relative flex w-full flex-col gap-3 overflow-hidden rounded-2xl p-4 shadow-lg backdrop-blur-sm",
        "bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100",
        "dark:from-purple-950/50 dark:via-indigo-950/50 dark:to-blue-950/50"
      )}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm dark:bg-white/5" />

      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2">
          <div className="text-indigo-600 dark:text-indigo-400">
            <ClockIcon size={24} />
          </div>
          <div className="font-semibold text-indigo-900 text-lg dark:text-indigo-100">
            AntClock
          </div>
          <div className="ml-auto rounded-full bg-purple-200 px-2 py-0.5 text-purple-800 text-xs dark:bg-purple-800/50 dark:text-purple-200">
            Discrete Riemann Geometry
          </div>
        </div>

        {isInfoResult(antClockResult) && <InfoDisplay data={antClockResult} />}
        {isDigitMirrorResult(antClockResult) && (
          <DigitMirrorDisplay data={antClockResult} />
        )}
        {isPascalCurvatureResult(antClockResult) && (
          <PascalCurvatureDisplay data={antClockResult} />
        )}
        {isCurvatureWalkResult(antClockResult) && (
          <CurvatureWalkDisplay data={antClockResult} />
        )}
      </div>
    </div>
  );
}
