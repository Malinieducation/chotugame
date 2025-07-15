import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TreePine, 
  Apple, 
  Scissors, 
  Package, 
  Refrigerator, 
  Truck, 
  Store,
  User,
  RotateCcw,
  CheckCircle,
  XCircle,
  Lightbulb,
  Target
} from 'lucide-react';

interface PathStation {
  id: number;
  title: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  correctOrder: number;
  description: string;
}

interface DrawnPath {
  from: number;
  to: number;
  isCorrect?: boolean;
}

interface DrawPathInteractiveProps {
  playerName: string;
  onComplete: (score: number, attempts: number) => void;
}

export const DrawPathInteractive: React.FC<DrawPathInteractiveProps> = ({ 
  playerName, 
  onComplete 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startStation, setStartStation] = useState<number | null>(null);
  const [drawnPaths, setDrawnPaths] = useState<DrawnPath[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  const stations: PathStation[] = [
    {
      id: 1,
      title: "Farm",
      icon: <TreePine className="w-6 h-6 text-farm-green" />,
      x: 100,
      y: 150,
      correctOrder: 1,
      description: "Where apples grow on trees"
    },
    {
      id: 2,
      title: "Harvest",
      icon: <Apple className="w-6 h-6 text-apple-red" />,
      x: 300,
      y: 100,
      correctOrder: 2,
      description: "Picking ripe apples"
    },
    {
      id: 3,
      title: "Sort & Clean",
      icon: <Scissors className="w-6 h-6 text-primary" />,
      x: 500,
      y: 200,
      correctOrder: 3,
      description: "Quality check and cleaning"
    },
    {
      id: 4,
      title: "Pack",
      icon: <Package className="w-6 h-6 text-secondary-foreground" />,
      x: 400,
      y: 350,
      correctOrder: 4,
      description: "Boxing for transport"
    },
    {
      id: 5,
      title: "Storage",
      icon: <Refrigerator className="w-6 h-6 text-sky-blue" />,
      x: 200,
      y: 400,
      correctOrder: 5,
      description: "Cool storage facility"
    },
    {
      id: 6,
      title: "Transport",
      icon: <Truck className="w-6 h-6 text-muted-foreground" />,
      x: 600,
      y: 300,
      correctOrder: 6,
      description: "Delivery to market"
    },
    {
      id: 7,
      title: "Wholesale",
      icon: <Store className="w-6 h-6 text-accent-foreground" />,
      x: 550,
      y: 450,
      correctOrder: 7,
      description: "Bulk distribution"
    },
    {
      id: 8,
      title: "Retail",
      icon: <Store className="w-6 h-6 text-primary" />,
      x: 350,
      y: 500,
      correctOrder: 8,
      description: "Final sale to customers"
    },
    {
      id: 9,
      title: "Chotu! 🎉",
      icon: <User className="w-6 h-6 text-apple-red animate-bounce-apple" />,
      x: 150,
      y: 500,
      correctOrder: 9,
      description: "Happy Chotu gets his apple!"
    }
  ];

  const getCorrectPath = (): DrawnPath[] => {
    const correctConnections: DrawnPath[] = [];
    for (let i = 1; i < stations.length; i++) {
      const currentStation = stations.find(s => s.correctOrder === i);
      const nextStation = stations.find(s => s.correctOrder === i + 1);
      if (currentStation && nextStation) {
        correctConnections.push({
          from: currentStation.id,
          to: nextStation.id,
          isCorrect: true
        });
      }
    }
    return correctConnections;
  };

  const handleStationClick = (stationId: number) => {
    if (!startStation) {
      setStartStation(stationId);
    } else if (startStation !== stationId) {
      // Create connection
      const newPath: DrawnPath = {
        from: startStation,
        to: stationId
      };
      
      // Check if this connection is correct
      const correctPaths = getCorrectPath();
      const isCorrect = correctPaths.some(cp => 
        (cp.from === newPath.from && cp.to === newPath.to) ||
        (cp.from === newPath.to && cp.to === newPath.from)
      );
      
      newPath.isCorrect = isCorrect;
      setDrawnPaths(prev => [...prev, newPath]);
      setStartStation(null);
    } else {
      setStartStation(null);
    }
  };

  const checkSolution = () => {
    setAttempts(prev => prev + 1);
    const correctPaths = getCorrectPath();
    const correctConnections = drawnPaths.filter(path => path.isCorrect).length;
    const score = Math.round((correctConnections / correctPaths.length) * 100);
    
    setCurrentScore(score);
    
    if (score === 100) {
      setGameComplete(true);
      setTimeout(() => {
        onComplete(score, attempts + 1);
      }, 2000);
    }
  };

  const resetPaths = () => {
    setDrawnPaths([]);
    setStartStation(null);
    setShowHint(false);
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    drawnPaths.forEach(path => {
      const fromStation = stations.find(s => s.id === path.from);
      const toStation = stations.find(s => s.id === path.to);
      
      if (fromStation && toStation) {
        ctx.beginPath();
        ctx.moveTo(fromStation.x + 40, fromStation.y + 40);
        ctx.lineTo(toStation.x + 40, toStation.y + 40);
        ctx.strokeStyle = path.isCorrect ? '#22c55e' : '#ef4444';
        ctx.lineWidth = path.isCorrect ? 4 : 3;
        ctx.stroke();
        
        // Draw arrow
        const angle = Math.atan2(toStation.y - fromStation.y, toStation.x - fromStation.x);
        const arrowLength = 15;
        ctx.beginPath();
        ctx.moveTo(toStation.x + 40, toStation.y + 40);
        ctx.lineTo(
          toStation.x + 40 - arrowLength * Math.cos(angle - Math.PI / 6),
          toStation.y + 40 - arrowLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(toStation.x + 40, toStation.y + 40);
        ctx.lineTo(
          toStation.x + 40 - arrowLength * Math.cos(angle + Math.PI / 6),
          toStation.y + 40 - arrowLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
      }
    });
  };

  useEffect(() => {
    drawCanvas();
  }, [drawnPaths]);

  const getHintForNextStep = () => {
    const correctPaths = getCorrectPath();
    const correctConnections = drawnPaths.filter(p => p.isCorrect);
    const nextCorrectPath = correctPaths[correctConnections.length];
    
    if (nextCorrectPath) {
      const fromStation = stations.find(s => s.id === nextCorrectPath.from);
      const toStation = stations.find(s => s.id === nextCorrectPath.to);
      return `Try connecting ${fromStation?.title} to ${toStation?.title}`;
    }
    return "You're doing great! Keep thinking about the logical order.";
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-sky-blue/20 to-apple-green/20">
      {/* Header */}
      <div className="text-center mb-6 space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          🧠 {playerName}'s Critical Thinking Challenge
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Think carefully and draw the correct path! Click stations to connect them in the right order.
        </p>
        <div className="flex justify-center space-x-4 text-sm">
          <Badge variant="outline">Attempts: {attempts}</Badge>
          <Badge variant="outline">Score: {currentScore}%</Badge>
        </div>
      </div>

      {/* Game Area */}
      <div className="max-w-4xl mx-auto">
        <Card className="relative bg-card/95 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-center flex items-center justify-center space-x-2">
              <Target className="w-6 h-6 text-primary" />
              <span>Connect the Apple Journey Stations</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="relative">
            {/* Canvas for drawing paths */}
            <canvas
              ref={canvasRef}
              width={700}
              height={600}
              className="absolute inset-0 pointer-events-none"
            />
            
            {/* Stations */}
            <div className="relative w-full h-[600px]">
              {stations.map(station => (
                <button
                  key={station.id}
                  onClick={() => handleStationClick(station.id)}
                  className={`
                    absolute w-20 h-20 rounded-full border-4 transition-all duration-300 flex flex-col items-center justify-center text-xs font-semibold
                    ${startStation === station.id 
                      ? 'bg-primary/20 border-primary scale-110 shadow-lg' 
                      : 'bg-card border-muted-foreground/30 hover:bg-accent hover:scale-105'
                    }
                  `}
                  style={{ 
                    left: `${station.x}px`, 
                    top: `${station.y}px` 
                  }}
                >
                  {station.icon}
                  <span className="mt-1 text-[10px] leading-tight text-center">
                    {station.title}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-4 bg-accent/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-5 h-5 text-sun-yellow" />
              <span className="font-semibold">How to Play:</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              1. Click on a station to select it  2. Click another station to draw a connection  3. Think about the logical order of apple production!
            </p>
            
            {showHint && (
              <div className="bg-apple-green/20 rounded-lg p-3 mb-3">
                <p className="text-sm font-medium text-foreground">
                  💡 Hint: {getHintForNextStep()}
                </p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                onClick={checkSolution}
                disabled={drawnPaths.length === 0}
                className="bg-gradient-to-r from-apple-red to-primary"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Check My Path
              </Button>
              
              <Button
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                className="border-sun-yellow/50"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                {showHint ? 'Hide Hint' : 'Need Help?'}
              </Button>
              
              <Button
                onClick={resetPaths}
                variant="outline"
                className="border-destructive/50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Paths
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Completion Message */}
        {gameComplete && (
          <Card className="mt-4 animate-scale-in bg-gradient-to-br from-accent to-apple-green border-2 border-primary">
            <CardContent className="text-center p-6 space-y-4">
              <CheckCircle className="w-16 h-16 text-primary mx-auto animate-bounce-apple" />
              <h2 className="text-2xl font-bold text-primary">
                🎉 Excellent Critical Thinking!
              </h2>
              <p className="text-foreground">
                Perfect! You've mastered the apple supply chain path!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};