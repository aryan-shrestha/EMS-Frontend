import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LucideIcon } from "lucide-react";

interface WidgetCardProps {
  title: string;
  icon: LucideIcon;
  value: string | undefined;
  valueDescription: string | null | undefined;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  icon: Icon,
  value,
  valueDescription,
}) => {
  return (
    <Card className="gap-0 shadow-none">
      <CardHeader>
        <div className="flex justify-between items-start pb-2">
          <CardTitle className="tracking-tight text-sm font-medium">
            {title}
          </CardTitle>
          <Icon className="h-5 w-5 text-muted-foreground" />{" "}
          {/* Ensure the icon renders correctly */}
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-2xl font-bold">
          {value === undefined ? (
            <Loader2 className="animate-spin w-5 mb-2" />
          ) : (
            value
          )}
        </h3>
        <p className="text-xs text-muted-foreground mt-2">{valueDescription}</p>
      </CardContent>
    </Card>
  );
};

export default WidgetCard;
