import { useState, useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    useNodesState,
    useEdgesState,
    MarkerType,
    Position,
    Handle
} from 'reactflow';
import 'reactflow/dist/style.css';

const CourseNode = ({ data }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div 
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 bg-blue-500"
                id={`target-${data.code}`}
            />
            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 bg-blue-500"
                id={`source-${data.code}`}
            />
            
            <div className="flex items-center gap-2 bg-white rounded-lg border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow w-80">
                <div className={`w-16 h-full py-3 flex items-center justify-center text-white ${
                    data.grade === 'A' ? 'bg-green-500' :
                    data.grade === 'B+' ? 'bg-blue-600' :
                    data.grade === 'B' ? 'bg-blue-500' :
                    data.grade === 'S' ? 'bg-purple-500' :
                    'bg-gray-400'
                }`}>
                    <div className="text-center">
                        <span className="font-bold text-lg">{data.grade}</span>
                        <div className="text-xs">({data.credits} cr)</div>
                    </div>
                </div>
                <div className="p-3 flex-1">
                    <p className="text-xs font-mono text-gray-600">{data.code}</p>
                    <p className="text-sm font-medium text-gray-900">{data.name}</p>
                </div>
            </div>
            
            {showTooltip && data.prerequisites && (
                <div className="absolute z-10 bg-black bg-opacity-75 text-white p-2 rounded text-xs -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    Prerequisites: {data.prerequisites.join(', ')}
                </div>
            )}
        </div>
    );
};

const SemesterHeader = ({ data }) => (
    <div className="bg-blue-100 p-3 rounded-lg border-2 border-blue-200 shadow-sm">
        <h3 className="font-bold text-blue-800">{data.label}</h3>
        <div className="text-sm text-blue-600">
            GPA: {data.gpa} | Credits: {data.credits}
        </div>
    </div>
);

const nodeTypes = {
    courseNode: CourseNode,
    semesterHeader: SemesterHeader,
};

const SEMESTER_SPACING = 400;
const VERTICAL_SPACING = 100;
const HEADER_SPACING = 80;

export default function EnrollmentFlow() {
    const createNodePosition = (semester, index, isHeader = false) => ({
        x: semester * SEMESTER_SPACING + 50,
        y: (isHeader ? HEADER_SPACING : VERTICAL_SPACING * (index + 1)) + 50
    });

    const initialNodes = [
        // First Semester 2019 Header
        {
            id: 'header-2019-1',
            type: 'semesterHeader',
            position: createNodePosition(0, 0, true),
            data: { 
                label: 'First Semester 2019',
                gpa: '3.43',
                credits: '7'
            }
        },
        // First Semester 2019 Courses
        {
            id: '01213211',
            type: 'courseNode',
            position: createNodePosition(0, 0),
            data: { 
                code: '01213211',
                name: 'Materials Science for Engineers',
                grade: 'S',
                credits: '3',
                prerequisites: []
            }
        },
        {
            id: '01213513',
            type: 'courseNode',
            position: createNodePosition(0, 1),
            data: { 
                code: '01213513',
                name: 'Thermodynamics & Kinetics of Materials',
                grade: 'B',
                credits: '4',
                prerequisites: []
            }
        },
        {
            id: '01213591',
            type: 'courseNode',
            position: createNodePosition(0, 2),
            data: { 
                code: '01213591',
                name: 'Research Methods in Materials Engineering',
                grade: 'A',
                credits: '1',
                prerequisites: []
            }
        },
        {
            id: '01355501',
            type: 'courseNode',
            position: createNodePosition(0, 3),
            data: { 
                code: '01355501',
                name: 'English Required by Graduate School',
                grade: 'S',
                credits: '3',
                prerequisites: []
            }
        },
        // Second Semester 2019 Header
        {
            id: 'header-2019-2',
            type: 'semesterHeader',
            position: createNodePosition(1, 0, true),
            data: { 
                label: 'Second Semester 2019',
                gpa: '3.79',
                credits: '7'
            }
        },
        // Second Semester 2019 Courses
        {
            id: '01213514',
            type: 'courseNode',
            position: createNodePosition(1, 0),
            data: { 
                code: '01213514',
                name: 'Materials Characterization in Research',
                grade: 'B+',
                credits: '3',
                prerequisites: []
            }
        },
        {
            id: '01213532',
            type: 'courseNode',
            position: createNodePosition(1, 1),
            data: { 
                code: '01213532',
                name: 'Advanced Electroceramic Materials',
                grade: 'A',
                credits: '3',
                prerequisites: []
            }
        },
        {
            id: '01213597-1',
            type: 'courseNode',
            position: createNodePosition(1, 2),
            data: { 
                code: '01213597',
                name: 'Seminar',
                grade: 'A',
                credits: '1',
                prerequisites: []
            }
        },
        // First Semester 2020 Header
        {
            id: 'header-2020-1',
            type: 'semesterHeader',
            position: createNodePosition(2, 0, true),
            data: { 
                label: 'First Semester 2020',
                gpa: '4.00',
                credits: '13'
            }
        },
        // First Semester 2020 Courses
        {
            id: '01213529',
            type: 'courseNode',
            position: createNodePosition(2, 0),
            data: { 
                code: '01213529',
                name: 'Advanced Mechanical Behavior of Materials',
                grade: 'A',
                credits: '3',
                prerequisites: []
            }
        },
        {
            id: '01213533',
            type: 'courseNode',
            position: createNodePosition(2, 1),
            data: { 
                code: '01213533',
                name: 'Crystallography of Materials',
                grade: 'A',
                credits: '3',
                prerequisites: []
            }
        },
        {
            id: '01213597-2',
            type: 'courseNode',
            position: createNodePosition(2, 2),
            data: { 
                code: '01213597',
                name: 'Seminar',
                grade: 'A',
                credits: '1',
                prerequisites: ['01213597-1']
            }
        },
        {
            id: '01213599-1',
            type: 'courseNode',
            position: createNodePosition(2, 3),
            data: { 
                code: '01213599',
                name: 'Thesis',
                grade: 'S',
                credits: '6',
                prerequisites: []
            }
        },
        // Second Semester 2020 Header
        {
            id: 'header-2020-2',
            type: 'semesterHeader',
            position: createNodePosition(3, 0, true),
            data: { 
                label: 'Second Semester 2020',
                gpa: '4.00',
                credits: '9'
            }
        },
        // Second Semester 2020 Courses
        {
            id: '01213552',
            type: 'courseNode',
            position: createNodePosition(3, 0),
            data: { 
                code: '01213552',
                name: 'Nanoengineering',
                grade: 'A',
                credits: '3',
                prerequisites: []
            }
        },
        {
            id: '01213599-2',
            type: 'courseNode',
            position: createNodePosition(3, 1),
            data: { 
                code: '01213599',
                name: 'Thesis',
                grade: 'S',
                credits: '6',
                prerequisites: ['01213599-1']
            }
        }
    ];

    const initialEdges = [
        // Connect Seminar courses
        {
            id: 'seminar-link',
            source: '01213597-1',
            target: '01213597-2',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#3b82f6', strokeWidth: 2 },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#3b82f6',
            }
        },
        // Connect Thesis courses
        {
            id: 'thesis-link',
            source: '01213599-1',
            target: '01213599-2',
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#3b82f6', strokeWidth: 2 },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#3b82f6',
            }
        }
    ];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({
            ...params,
            type: 'smoothstep',
            animated: true,
            style: { stroke: '#3b82f6', strokeWidth: 2 },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#3b82f6',
            }
        }, eds)),
        [setEdges]
    );

    return (
        <div className="w-full h-[calc(100vh-theme(spacing.16))]">
            <div className="bg-white p-4 mb-4 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-800">Course Prerequisites - Materials Engineering</h2>
                <p className="text-sm text-gray-600 mt-1">Graduate School, Kasetsart University</p>
                
                <div className="flex gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span>Grade A</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <span>Grade B+</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span>Grade B</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                        <span>Grade S</span>
                    </div>
                </div>
            </div>

            <div className="w-full h-[calc(100%-theme(spacing.24))] bg-gray-50 rounded-lg shadow overflow-hidden">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                    minZoom={0.2}
                    maxZoom={1.5}
                    defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
                    nodesDraggable={false}
                    nodesConnectable={false}
                    elementsSelectable={true}
                >
                    <Background color="#94a3b8" gap={16} size={1} />
                    <Controls showInteractive={false} />
                </ReactFlow>
            </div>
        </div>
    );
}