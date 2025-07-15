import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TreePine, 
  Flower, 
  Apple, 
  Scissors, 
  Package, 
  Refrigerator, 
  Truck, 
  Store,
  User,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface PathStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  substeps: string[];
}

interface PathDrawingGameProps {
  playerName: string;
  onFinishGame: (completedSteps: number) => void;
}

export const PathDrawingGame: React.FC<PathDrawingGameProps> = ({ 
  playerName, 
  onFinishGame 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const pathSteps: PathStep[] = [
    {
      id: 1,
      title: "Farm",
      description: "Apple trees are planted and nurtured on the farm",
      icon: <TreePine className="w-8 h-8 text-farm-green" />,
      completed: false,
      substeps: ["Apple Trees", "Flowering", "Apple Growth", "Ready for Harvest"]
    },
    {
      id: 2,
      title: "Harvesting",
      description: "Apples are carefully picked from the trees",
      icon: <Apple className="w-8 h-8 text-apple-red animate-bounce-apple" />,
      completed: false,
      substeps: ["Picking Apples", "Quality Check", "Collection"]
    },
    {
      id: 3,
      title: "Sorting & Cleaning",
      description: "Apples are sorted by quality and cleaned",
      icon: <Scissors className="w-8 h-8 text-primary" />,
      completed: false,
      substeps: ["Size Sorting", "Quality Grading", "Washing", "Drying"]
    },
    {
      id: 4,
      title: "Packing House",
      description: "Apples are packed into crates and boxes",
      icon: <Package className="w-8 h-8 text-secondary-foreground" />,
      completed: false,
      substeps: ["Boxing", "Labeling", "Sealing"]
    },
    {
      id: 5,
      title: "Storage",
      description: "Apples are stored in controlled environment",
      icon: <Refrigerator className="w-8 h-8 text-sky-blue" />,
      completed: false,
      substeps: ["Cool Storage", "Humidity Control", "Freshness Maintained"]
    },
    {
      id: 6,
      title: "Transportation",
      description: "Apples are loaded and transported to market",
      icon: <Truck className="w-8 h-8 text-muted-foreground" />,
      completed: false,
      substeps: ["Loading", "Safe Transport", "Delivery"]
    },
    {
      id: 7,
      title: "Wholesale Market",
      description: "Apples are sold to retailers at wholesale market",
      icon: <Store className="w-8 h-8 text-accent-foreground" />,
      completed: false,
      substeps: ["Bulk Sales", "Price Setting", "Distribution"]
    },
    {
      id: 8,
      title: "Retail Store",
      description: "Apples are displayed and sold to consumers",
      icon: <Store className="w-8 h-8 text-primary" />,
      completed: false,
      substeps: ["Display", "Customer Service", "Final Sale"]
    },
    {
      id: 9,
      title: "Chotu Gets His Apple!",
      description: "Chotu happily receives his fresh apple and celebrates!",
      icon: <User className="w-8 h-8 text-apple-red animate-bounce-apple" />,
      completed: false,
      substeps: ["Purchase Complete", "Happy Chotu", "Apple Enjoyed!", "Mission Success! 🎉"]
    }
  ];

  const completeStep = () => {
    if (currentStep < pathSteps.length) {
      const newCompletedSteps = [...completedSteps, currentStep];
      setCompletedSteps(newCompletedSteps);
      
      if (currentStep === pathSteps.length - 1) {
        setIsCompleted(true);
        setTimeout(() => {
          onFinishGame(newCompletedSteps.length);
        }, 1500);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const progress = (completedSteps.length / pathSteps.length) * 100;

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">
          🍎 {playerName}'s Apple Journey
        </h1>
        <Progress value={progress} className="w-full max-w-md mx-auto" />
        <p className="text-sm text-muted-foreground">
          Step {completedSteps.length + 1} of {pathSteps.length}
        </p>
      </div>

      {/* Current Step */}
      {!isCompleted && (
        <Card className="max-w-2xl mx-auto animate-fade-in-up bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {pathSteps[currentStep]?.icon}
            </div>
            <CardTitle className="text-xl">
              {pathSteps[currentStep]?.title}
            </CardTitle>
            <p className="text-muted-foreground">
              {pathSteps[currentStep]?.description}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Journey Steps:</h3>
              <div className="grid grid-cols-2 gap-2">
                {pathSteps[currentStep]?.substeps.map((substep, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {substep}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button
              onClick={completeStep}
              className="w-full bg-gradient-to-r from-apple-red to-primary hover:from-apple-red/90 hover:to-primary/90"
            >
              Complete This Step <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Completed Message */}
      {isCompleted && (
        <Card className="max-w-md mx-auto animate-scale-in bg-gradient-to-br from-accent to-apple-green">
          <CardContent className="text-center p-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-primary mx-auto" />
            <h2 className="text-2xl font-bold text-primary">
              🎉 Journey Complete!
            </h2>
            <p className="text-foreground">
              Great job {playerName}! Chotu now has fresh apples thanks to your help!
            </p>
            <User className="w-12 h-12 text-apple-red mx-auto animate-bounce-apple" />
          </CardContent>
        </Card>
      )}

      {/* Path Visualization */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4">
          {pathSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                p-3 rounded-full border-2 transition-all duration-300
                ${completedSteps.includes(index) 
                  ? 'bg-accent border-primary shadow-lg' 
                  : index === currentStep 
                    ? 'bg-primary/10 border-primary animate-pulse' 
                    : 'bg-muted border-muted-foreground/30'
                }
              `}>
                {completedSteps.includes(index) ? (
                  <CheckCircle className="w-6 h-6 text-primary" />
                ) : (
                  <div className="w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {step.id}
                  </div>
                )}
              </div>
              {index < pathSteps.length - 1 && (
                <ArrowRight className={`
                  w-4 h-4 mx-2 transition-colors duration-300
                  ${completedSteps.includes(index) ? 'text-primary' : 'text-muted-foreground/50'}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};