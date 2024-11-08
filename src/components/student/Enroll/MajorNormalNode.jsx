import React, { useState } from "react";

import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
  Handle,
} from "reactflow";
import "reactflow/dist/style.css";
import MajorRegisNodeItem from "../MajorRegisNodeItem";

function MajorNormalNode({ data }) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div
      className="relative "
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
        id={`target-top-${data.code}`}
      />

      <Handle
        type="target"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
        id={`target-bottom-${data.code}`}
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-500"
        id={`target-left-${data.code}`}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-500"
        id={`source-right-${data.code}`}
      />

      <Handle
        type="source"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
        id={`source-top-${data.code}`}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
        id={`source-bottom-${data.code}`}
      />

      <div className=" flex items-center gap-4 bg-white rounded-xl border-3 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 w-[700px]">
        <div
          className={`w-48 h-full py-12 flex items-center justify-center text-white ${
            data.grade === "A"
              ? "bg-green-500"
              : data.grade === "B"
              ? "bg-blue-600"
              : data.grade === "C"
              ? "bg-blue-500"
              : data.grade === "D"
              ? "bg-orange-500"
              : data.grade === "F"
              ? "bg-red-500"
              : "bg-gray-400"
          }`}
        >
          <div className="text-center">
            <span className="font-bold text-6xl">{data.grade}</span>
            <div className="text-6xl mt-2">({data.credits} cr)</div>
          </div>
        </div>
        <div className="p-12 flex-1">
          <p className="text-7xl font-mono text-gray-600 mb-4">{data.code}</p>
          <p className="text-6xl font-medium text-gray-900">{data.name}</p>
        </div>
      </div>

      {showTooltip && data.prerequisites && (
        <div className="absolute z-10 bg-black bg-opacity-75 text-white p-4 rounded text-7xl -top-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          Prerequisites: {data.prerequisites.join(", ")}
        </div>
      )}
    </div>
  );
}

export default MajorNormalNode;
