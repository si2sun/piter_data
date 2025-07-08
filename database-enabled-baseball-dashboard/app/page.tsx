"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Moon,
  Sun,
  Play,
  Pause,
  Volume2,
  Maximize,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Target,
  Clock,
  BarChart3,
  Upload,
  X,
  Save,
  Settings,
  User,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// 模擬數據
const postureScores = [
  {
    name: "手腕",
    score: 85,
    details: { distance: "12cm", height: "145cm", angle: "15°" },
    historical: { best: 92, average: 78 },
  },
  {
    name: "手肘",
    score: 78,
    details: { distance: "8cm", height: "165cm", angle: "45°" },
    historical: { best: 88, average: 75 },
  },
  {
    name: "抬腿",
    score: 92,
    details: { distance: "45cm", height: "85cm", angle: "90°" },
    historical: { best: 95, average: 85 },
  },
  {
    name: "腰部旋轉",
    score: 88,
    details: { distance: "25cm", height: "110cm", angle: "65°" },
    historical: { best: 94, average: 82 },
  },
  {
    name: "踩步",
    score: 75,
    details: { distance: "120cm", height: "5cm", angle: "12°" },
    historical: { best: 85, average: 72 },
  },
  {
    name: "平均評分",
    score: 84,
    details: { distance: "42cm", height: "102cm", angle: "45°" },
    historical: { best: 91, average: 78 },
  },
]

const timeHeightData = [
  { time: 0, 手腕: 140, 手肘: 160, 膝蓋: 80, 腳踝: 10 },
  { time: 0.2, 手腕: 145, 手肘: 165, 膝蓋: 85, 腳踝: 12 },
  { time: 0.4, 手腕: 150, 手肘: 170, 膝蓋: 90, 腳踝: 15 },
  { time: 0.6, 手腕: 155, 手肘: 175, 膝蓋: 85, 腳踝: 18 },
  { time: 0.8, 手腕: 160, 手肘: 180, 膝蓋: 80, 腳踝: 20 },
  { time: 1.0, 手腕: 165, 手肘: 185, 膝蓋: 75, 腳踝: 22 },
]

const radarData = postureScores.map((item) => ({
  subject: item.name,
  score: item.score,
  fullMark: 100,
}))

const historyData = [
  {
    id: 1,
    pitchNumber: "第1球",
    time: "14:30:15",
    speed: "95 mph",
    type: "快速球",
    spinRate: "2400 RPM",
    spinAxis: { x: 15, y: 45, z: 30 },
    spinEfficiency: "85%",
    scores: [
      {
        name: "手腕",
        score: 82,
        details: { distance: "11cm", height: "142cm", angle: "14°" },
        historical: { best: 92, average: 78 },
      },
      {
        name: "手肘",
        score: 75,
        details: { distance: "7cm", height: "162cm", angle: "43°" },
        historical: { best: 88, average: 75 },
      },
      {
        name: "抬腿",
        score: 88,
        details: { distance: "42cm", height: "82cm", angle: "88°" },
        historical: { best: 95, average: 85 },
      },
      {
        name: "腰部旋轉",
        score: 85,
        details: { distance: "23cm", height: "108cm", angle: "62°" },
        historical: { best: 94, average: 82 },
      },
      {
        name: "踩步",
        score: 72,
        details: { distance: "118cm", height: "4cm", angle: "11°" },
        historical: { best: 85, average: 72 },
      },
      {
        name: "平均評分",
        score: 80,
        details: { distance: "40cm", height: "100cm", angle: "44°" },
        historical: { best: 91, average: 78 },
      },
    ],
  },
  {
    id: 2,
    pitchNumber: "第2球",
    time: "14:32:08",
    speed: "88 mph",
    type: "變化球",
    spinRate: "2100 RPM",
    spinAxis: { x: 25, y: 35, z: 40 },
    spinEfficiency: "78%",
    scores: [
      {
        name: "手腕",
        score: 85,
        details: { distance: "12cm", height: "145cm", angle: "16°" },
        historical: { best: 92, average: 78 },
      },
      {
        name: "手肘",
        score: 78,
        details: { distance: "8cm", height: "165cm", angle: "45°" },
        historical: { best: 88, average: 75 },
      },
      {
        name: "抬腿",
        score: 90,
        details: { distance: "44cm", height: "84cm", angle: "89°" },
        historical: { best: 95, average: 85 },
      },
      {
        name: "腰部旋轉",
        score: 87,
        details: { distance: "24cm", height: "109cm", angle: "64°" },
        historical: { best: 94, average: 82 },
      },
      {
        name: "踩步",
        score: 76,
        details: { distance: "122cm", height: "5cm", angle: "13°" },
        historical: { best: 85, average: 72 },
      },
      {
        name: "平均評分",
        score: 83,
        details: { distance: "42cm", height: "102cm", angle: "45°" },
        historical: { best: 91, average: 78 },
      },
    ],
  },
  {
    id: 3,
    pitchNumber: "第3球",
    time: "14:35:22",
    speed: "92 mph",
    type: "滑球",
    spinRate: "2650 RPM",
    spinAxis: { x: 10, y: 55, z: 25 },
    spinEfficiency: "92%",
    scores: [
      {
        name: "手腕",
        score: 87,
        details: { distance: "13cm", height: "147cm", angle: "17°" },
        historical: { best: 92, average: 78 },
      },
      {
        name: "手肘",
        score: 80,
        details: { distance: "9cm", height: "167cm", angle: "47°" },
        historical: { best: 88, average: 75 },
      },
      {
        name: "抬腿",
        score: 85,
        details: { distance: "41cm", height: "81cm", angle: "86°" },
        historical: { best: 95, average: 85 },
      },
      {
        name: "腰部旋轉",
        score: 89,
        details: { distance: "26cm", height: "111cm", angle: "66°" },
        historical: { best: 94, average: 82 },
      },
      {
        name: "踩步",
        score: 78,
        details: { distance: "125cm", height: "6cm", angle: "14°" },
        historical: { best: 85, average: 72 },
      },
      {
        name: "平均評分",
        score: 84,
        details: { distance: "43cm", height: "103cm", angle: "46°" },
        historical: { best: 91, average: 78 },
      },
    ],
  },
]

// 球種數據
const pitchTypes = [
  {
    name: "四縫線快速球",
    data: {
      speed: "95-98 mph",
      spinRate: "2300-2500 RPM",
      spinAxis: "12:00-1:00",
      spinEfficiency: "85-95%",
    },
    postureScores: [
      { name: "手腕", score: 88 },
      { name: "手肘", score: 85 },
      { name: "抬腿", score: 90 },
      { name: "腰部旋轉", score: 87 },
      { name: "踩步", score: 82 },
    ],
  },
  {
    name: "二縫線快速球",
    data: {
      speed: "92-95 mph",
      spinRate: "2100-2300 RPM",
      spinAxis: "1:00-2:00",
      spinEfficiency: "80-90%",
    },
    postureScores: [
      { name: "手腕", score: 85 },
      { name: "手肘", score: 83 },
      { name: "抬腿", score: 88 },
      { name: "腰部旋轉", score: 85 },
      { name: "踩步", score: 80 },
    ],
  },
  {
    name: "曲球",
    data: {
      speed: "75-82 mph",
      spinRate: "2800-3200 RPM",
      spinAxis: "6:00-7:00",
      spinEfficiency: "90-98%",
    },
    postureScores: [
      { name: "手腕", score: 82 },
      { name: "手肘", score: 78 },
      { name: "抬腿", score: 85 },
      { name: "腰部旋轉", score: 88 },
      { name: "踩步", score: 75 },
    ],
  },
  {
    name: "變速球",
    data: {
      speed: "78-85 mph",
      spinRate: "1800-2200 RPM",
      spinAxis: "12:00-1:00",
      spinEfficiency: "75-85%",
    },
    postureScores: [
      { name: "手腕", score: 80 },
      { name: "手肘", score: 82 },
      { name: "抬腿", score: 87 },
      { name: "腰部旋轉", score: 83 },
      { name: "踩步", score: 78 },
    ],
  },
  {
    name: "滑球",
    data: {
      speed: "82-88 mph",
      spinRate: "2400-2800 RPM",
      spinAxis: "4:00-5:00",
      spinEfficiency: "85-92%",
    },
    postureScores: [
      { name: "手腕", score: 86 },
      { name: "手肘", score: 80 },
      { name: "抬腿", score: 83 },
      { name: "腰部旋轉", score: 89 },
      { name: "踩步", score: 81 },
    ],
  },
  {
    name: "指叉球",
    data: {
      speed: "80-87 mph",
      spinRate: "1500-1900 RPM",
      spinAxis: "12:00-1:00",
      spinEfficiency: "70-80%",
    },
    postureScores: [
      { name: "手腕", score: 78 },
      { name: "手肘", score: 85 },
      { name: "抬腿", score: 86 },
      { name: "腰部旋轉", score: 84 },
      { name: "踩步", score: 79 },
    ],
  },
]

export default function BaseballDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [expandedScore, setExpandedScore] = useState<string | null>(null)
  const [expandedHistory, setExpandedHistory] = useState<number | null>(null)
  const [expandedPitch, setExpandedPitch] = useState<string | null>(null)
  const [fontSize, setFontSize] = useState([16])
  const [history, setHistory] = useState(historyData)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default"
    if (score >= 80) return "secondary"
    return "destructive"
  }

  const handleSaveData = () => {
    setHistory([])
    setSaveDialogOpen(false)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
      style={{ fontSize: `${fontSize[0]}px` }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">投手分析儀表板</h1>
          <div className="flex items-center space-x-4">
            {/* Font Size Control */}
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span className="text-sm">字體</span>
              <Slider value={fontSize} onValueChange={setFontSize} max={24} min={12} step={1} className="w-20" />
            </div>
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">即時分析</TabsTrigger>
            <TabsTrigger value="player-data">選手資料</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {/* Main Dashboard - Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-6 mb-8">
              {/* Left Side - Video Player */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                    <video className="w-full h-full object-cover" poster="/placeholder.svg?height=360&width=640">
                      <source src="/placeholder-video.mp4" type="video/mp4" />
                    </video>

                    {/* Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="text-white hover:bg-white/20"
                          >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Upload className="h-4 w-4 mr-1" />
                            匯入
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <X className="h-4 w-4 mr-1" />
                            取消
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Maximize className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Ball Info Overlay */}
                    <div className="absolute bottom-16 left-4 bg-black/60 rounded-lg p-3 text-white">
                      <div className="text-2xl font-bold">95 MPH</div>
                      <div className="text-sm">快速球</div>
                      <div className="text-xs mt-1">旋轉: 2400 RPM | 軸向: 45°</div>
                    </div>
                  </div>
                  {/* Ball Details Section */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Ball Speed & Type */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-300">球速 & 球種</h3>
                        <div className="text-2xl font-bold text-blue-600">95 MPH</div>
                        <div className="text-lg text-gray-700 dark:text-gray-300">快速球</div>
                      </div>

                      {/* Spin Rate */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-300">旋轉速度</h3>
                        <div className="text-2xl font-bold text-green-600">2400 RPM</div>
                        <div className="text-sm text-gray-500">旋轉軸角度: 15°/45°/30°</div>
                      </div>

                      {/* Spin Efficiency */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-300">旋轉效率</h3>
                        <div className="text-2xl font-bold text-purple-600">85%</div>
                        <div className="text-sm text-gray-500">效率等級: 優秀</div>
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-300">其他數據</h3>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <div>釋球點: 6.2ft</div>
                          <div>垂直移動: +16.2in</div>
                          <div>水平移動: -8.1in</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Side - Analysis */}
              <div className="space-y-4">
                <Tabs defaultValue="scores" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="scores">姿勢評分</TabsTrigger>
                    <TabsTrigger value="timeline">時間軸</TabsTrigger>
                    <TabsTrigger value="radar">雷達圖</TabsTrigger>
                  </TabsList>

                  <TabsContent value="scores" className="space-y-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="h-5 w-5 mr-2" />
                          投手姿勢評分
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {postureScores.map((item) => (
                          <div key={item.name} className="space-y-2">
                            <div
                              className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded"
                              onClick={() => setExpandedScore(expandedScore === item.name ? null : item.name)}
                            >
                              <div className="flex items-center space-x-2">
                                {expandedScore === item.name ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={getScoreBadgeVariant(item.score)}>{item.score}</Badge>
                                <Progress value={item.score} className="w-20" />
                              </div>
                            </div>

                            {expandedScore === item.name && (
                              <div className="ml-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">移動距離:</span>
                                    <div className="font-medium">{item.details.distance}</div>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">高度:</span>
                                    <div className="font-medium">{item.details.height}</div>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">角度:</span>
                                    <div className="font-medium">{item.details.angle}</div>
                                  </div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                                  <span>歷史最佳: {item.historical.best}</span>
                                  <span>平均分數: {item.historical.average}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="timeline">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Clock className="h-5 w-5 mr-2" />
                          投球時間軸分析
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={timeHeightData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                              dataKey="time"
                              label={{ value: "時間 (秒)", position: "insideBottom", offset: -5 }}
                            />
                            <YAxis label={{ value: "高度 (cm)", angle: -90, position: "insideLeft" }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="手腕" stroke="#8884d8" strokeWidth={2} />
                            <Line type="monotone" dataKey="手肘" stroke="#82ca9d" strokeWidth={2} />
                            <Line type="monotone" dataKey="膝蓋" stroke="#ffc658" strokeWidth={2} />
                            <Line type="monotone" dataKey="腳踝" stroke="#ff7300" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="radar">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="h-5 w-5 mr-2" />
                          綜合能力雷達圖
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <RadarChart data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={90} domain={[0, 100]} />
                            <Radar
                              name="評分"
                              dataKey="score"
                              stroke="#8884d8"
                              fill="#8884d8"
                              fillOpacity={0.3}
                              strokeWidth={2}
                            />
                            <Tooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              {/* Video Player */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                    <video className="w-full h-full object-cover" poster="/placeholder.svg?height=360&width=640">
                      <source src="/placeholder-video.mp4" type="video/mp4" />
                    </video>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="text-white hover:bg-white/20"
                          >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Upload className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-16 left-4 bg-black/60 rounded-lg p-3 text-white">
                      <div className="text-xl font-bold">95 MPH</div>
                      <div className="text-sm">快速球 | 2400 RPM | 85%</div>
                    </div>
                  </div>
                  {/* Ball Details Section */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-300">球速 & 球種</h3>
                        <div className="text-xl font-bold text-blue-600">95 MPH</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">快速球</div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-300">旋轉 & 軸角度</h3>
                        <div className="text-xl font-bold text-green-600">2400 RPM</div>
                        <div className="text-sm text-gray-500">軸角度: 15°/45°/30°</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Tabs */}
              <Tabs defaultValue="scores" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="scores">評分</TabsTrigger>
                  <TabsTrigger value="timeline">時間軸</TabsTrigger>
                  <TabsTrigger value="radar">雷達圖</TabsTrigger>
                </TabsList>

                <TabsContent value="scores" className="space-y-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>投手姿勢評分</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {postureScores.map((item) => (
                        <div key={item.name} className="space-y-2">
                          <div
                            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded"
                            onClick={() => setExpandedScore(expandedScore === item.name ? null : item.name)}
                          >
                            <div className="flex items-center space-x-2">
                              {expandedScore === item.name ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <Badge variant={getScoreBadgeVariant(item.score)}>{item.score}</Badge>
                          </div>

                          {expandedScore === item.name && (
                            <div className="ml-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-2">
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">移動距離:</span>
                                  <span className="font-medium">{item.details.distance}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">高度:</span>
                                  <span className="font-medium">{item.details.height}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">角度:</span>
                                  <span className="font-medium">{item.details.angle}</span>
                                </div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                                <span>最佳: {item.historical.best}</span>
                                <span>平均: {item.historical.average}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timeline">
                  <Card>
                    <CardHeader>
                      <CardTitle>投球時間軸分析</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={timeHeightData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="手腕" stroke="#8884d8" strokeWidth={2} />
                          <Line type="monotone" dataKey="手肘" stroke="#82ca9d" strokeWidth={2} />
                          <Line type="monotone" dataKey="膝蓋" stroke="#ffc658" strokeWidth={2} />
                          <Line type="monotone" dataKey="腳踝" stroke="#ff7300" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="radar">
                  <Card>
                    <CardHeader>
                      <CardTitle>綜合能力雷達圖</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={radarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} />
                          <Radar
                            name="評分"
                            dataKey="score"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Bottom Section - Analysis & History */}
            <div className="grid lg:grid-cols-3 gap-6 mt-8">
              {/* Key Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    關鍵指標分析
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="font-medium text-red-800 dark:text-red-200">需要改善: 踩步</div>
                      <div className="text-sm text-red-600 dark:text-red-300 mt-1">評分: 75 (低於平均 78)</div>
                      <div className="text-xs text-gray-500 mt-2">距離: 120cm | 高度: 5cm | 角度: 12°</div>
                    </div>

                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="font-medium text-green-800 dark:text-green-200">表現優異: 抬腿</div>
                      <div className="text-sm text-green-600 dark:text-green-300 mt-1">評分: 92 (高於平均 85)</div>
                      <div className="text-xs text-gray-500 mt-2">距離: 45cm | 高度: 85cm | 角度: 90°</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Improvement Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    姿勢改善建議
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="font-medium text-blue-800 dark:text-blue-200">踩步改善</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        建議增加踩步距離至130-140cm，保持身體平衡
                      </div>
                    </div>

                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="font-medium text-yellow-800 dark:text-yellow-200">手肘位置</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        手肘角度可再提升5-10度，增加球速
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="font-medium text-purple-800 dark:text-purple-200">整體協調</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        保持現有抬腿優勢，強化下半身穩定性
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* History Records */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      今日歷史記錄
                    </div>
                    <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          <Save className="h-4 w-4 mr-1" />
                          存檔
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>確認存檔</DialogTitle>
                          <DialogDescription>您確定要存檔嗎？存檔後將清空今日歷史記錄。</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                            否
                          </Button>
                          <Button onClick={handleSaveData}>是</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {history.length === 0 ? (
                      <div className="text-center text-gray-500 py-4">暫無歷史記錄</div>
                    ) : (
                      history.map((record) => (
                        <div key={record.id} className="space-y-2">
                          <div
                            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg border"
                            onClick={() => setExpandedHistory(expandedHistory === record.id ? null : record.id)}
                          >
                            <div className="flex items-center space-x-3">
                              {expandedHistory === record.id ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                              <div>
                                <div className="font-medium text-lg">{record.pitchNumber}</div>
                                <div className="text-sm text-gray-500">
                                  {record.speed} - {record.type} - {record.spinEfficiency}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">{record.time}</div>
                          </div>

                          {expandedHistory === record.id && (
                            <div className="ml-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
                              <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                                投手姿勢評分詳情
                              </div>
                              {record.scores.map((item) => (
                                <div key={item.name} className="space-y-2">
                                  <div
                                    className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
                                    onClick={() =>
                                      setExpandedScore(
                                        expandedScore === `${record.id}-${item.name}`
                                          ? null
                                          : `${record.id}-${item.name}`,
                                      )
                                    }
                                  >
                                    <div className="flex items-center space-x-2">
                                      {expandedScore === `${record.id}-${item.name}` ? (
                                        <ChevronDown className="h-3 w-3" />
                                      ) : (
                                        <ChevronRight className="h-3 w-3" />
                                      )}
                                      <span className="font-medium text-sm">{item.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant={getScoreBadgeVariant(item.score)} className="text-xs">
                                        {item.score}
                                      </Badge>
                                      <Progress value={item.score} className="w-16 h-2" />
                                    </div>
                                  </div>

                                  {expandedScore === `${record.id}-${item.name}` && (
                                    <div className="ml-5 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs space-y-1">
                                      <div className="grid grid-cols-3 gap-2">
                                        <div>
                                          <span className="text-gray-500">距離:</span>
                                          <div className="font-medium">{item.details.distance}</div>
                                        </div>
                                        <div>
                                          <span className="text-gray-500">高度:</span>
                                          <div className="font-medium">{item.details.height}</div>
                                        </div>
                                        <div>
                                          <span className="text-gray-500">角度:</span>
                                          <div className="font-medium">{item.details.angle}</div>
                                        </div>
                                      </div>
                                      <div className="flex justify-between text-xs text-gray-500 pt-1 border-t">
                                        <span>最佳: {item.historical.best}</span>
                                        <span>平均: {item.historical.average}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="player-data">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Side - Player Photo and Import */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    選手資料
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=192&width=192"
                        alt="選手照片"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold">張大明</h3>
                      <p className="text-gray-500">右投右打 | 投手 | #18</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        選手匯入
                      </Button>
                      <Button variant="outline">
                        <X className="h-4 w-4 mr-2" />
                        取消
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Side - Pitch Type Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>球種分析資料</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pitchTypes.map((pitch) => (
                      <div key={pitch.name} className="space-y-2">
                        <div
                          className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg border"
                          onClick={() => setExpandedPitch(expandedPitch === pitch.name ? null : pitch.name)}
                        >
                          <div className="flex items-center space-x-2">
                            {expandedPitch === pitch.name ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                            <span className="font-medium">{pitch.name}</span>
                          </div>
                          <Badge variant="outline">{pitch.data.speed}</Badge>
                        </div>

                        {expandedPitch === pitch.name && (
                          <div className="ml-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
                            {/* 球種數據 */}
                            <div>
                              <h4 className="font-medium text-sm mb-2">球種數據</h4>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">球速:</span>
                                  <div className="font-medium">{pitch.data.speed}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">轉速:</span>
                                  <div className="font-medium">{pitch.data.spinRate}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">旋轉軸角度:</span>
                                  <div className="font-medium">{pitch.data.spinAxis}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">旋轉效率:</span>
                                  <div className="font-medium">{pitch.data.spinEfficiency}</div>
                                </div>
                              </div>
                            </div>

                            {/* 投手姿勢評分 */}
                            <div>
                              <h4 className="font-medium text-sm mb-2">投手姿勢評分</h4>
                              <div className="space-y-2">
                                {pitch.postureScores.map((score) => (
                                  <div key={score.name} className="flex items-center justify-between">
                                    <span className="text-sm">{score.name}</span>
                                    <div className="flex items-center space-x-2">
                                      <Badge variant={getScoreBadgeVariant(score.score)} className="text-xs">
                                        {score.score}
                                      </Badge>
                                      <Progress value={score.score} className="w-16 h-2" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
