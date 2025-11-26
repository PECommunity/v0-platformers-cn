"use client"

import { useState } from "react"
import { doraMetrics, platformMaturityQuestions } from "@/data/tools"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Calculator, ClipboardCheck, ArrowRight, RotateCcw } from "lucide-react"

interface ToolsSectionProps {
  selectedTool: string | null
  onSelectTool: (id: string | null) => void
}

export function ToolsSection({ selectedTool, onSelectTool }: ToolsSectionProps) {
  const [activeTool, setActiveTool] = useState<string>(selectedTool || "dora-metrics")

  // DORA Calculator State
  const [doraValues, setDoraValues] = useState({
    deploymentFrequency: "",
    leadTime: "",
    changeFailureRate: "",
    mttr: "",
  })

  // Platform Maturity Assessment State
  const [maturityAnswers, setMaturityAnswers] = useState<Record<string, number>>({})
  const [showMaturityResult, setShowMaturityResult] = useState(false)

  const calculateMaturityScore = () => {
    const answered = Object.keys(maturityAnswers).length
    if (answered === 0) return 0
    const total = Object.values(maturityAnswers).reduce((a, b) => a + b, 0)
    return (total / (answered * 4)) * 100
  }

  const getMaturityLevel = (score: number) => {
    if (score >= 90) return { level: "创新级", color: "text-green-400" }
    if (score >= 70) return { level: "优化级", color: "text-blue-400" }
    if (score >= 50) return { level: "标准化", color: "text-yellow-400" }
    if (score >= 30) return { level: "基础级", color: "text-orange-400" }
    return { level: "临时级", color: "text-red-400" }
  }

  const getDoraLevel = (metric: string, value: string) => {
    const numValue = Number.parseFloat(value)
    if (isNaN(numValue)) return null

    switch (metric) {
      case "deploymentFrequency":
        if (numValue >= 7) return "精英"
        if (numValue >= 1) return "高"
        if (numValue >= 0.25) return "中"
        return "低"
      case "leadTime":
        if (numValue <= 1) return "精英"
        if (numValue <= 7) return "高"
        if (numValue <= 30) return "中"
        return "低"
      case "changeFailureRate":
        if (numValue <= 15) return "精英"
        if (numValue <= 30) return "高/中"
        return "低"
      case "mttr":
        if (numValue <= 1) return "精英"
        if (numValue <= 24) return "高"
        if (numValue <= 168) return "中"
        return "低"
      default:
        return null
    }
  }

  const getLevelColor = (level: string | null) => {
    switch (level) {
      case "精英":
        return "text-green-400"
      case "高":
        return "text-blue-400"
      case "中":
        return "text-yellow-400"
      case "高/中":
        return "text-yellow-400"
      case "低":
        return "text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <section id="tools" className="bg-card/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">度量工具</h2>
          <p className="max-w-2xl text-muted-foreground">
            使用专业的度量和测算工具，评估你的平台工程成熟度和效能指标。
          </p>
        </div>

        <Tabs value={activeTool} onValueChange={setActiveTool}>
          <TabsList className="mb-8 flex-wrap">
            <TabsTrigger value="dora-metrics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              DORA 指标
            </TabsTrigger>
            <TabsTrigger value="platform-maturity" className="gap-2">
              <ClipboardCheck className="h-4 w-4" />
              成熟度评估
            </TabsTrigger>
            <TabsTrigger value="platform-roi" className="gap-2">
              <Calculator className="h-4 w-4" />
              ROI 计算器
            </TabsTrigger>
          </TabsList>

          {/* DORA Metrics Calculator */}
          <TabsContent value="dora-metrics">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>DORA 指标计算器</CardTitle>
                  <CardDescription>输入你的团队数据，评估软件交付效能</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="df">部署频率（每周部署次数）</Label>
                    <Input
                      id="df"
                      type="number"
                      placeholder="例如: 5"
                      value={doraValues.deploymentFrequency}
                      onChange={(e) => setDoraValues({ ...doraValues, deploymentFrequency: e.target.value })}
                    />
                    {doraValues.deploymentFrequency && (
                      <p
                        className={`text-sm ${getLevelColor(getDoraLevel("deploymentFrequency", doraValues.deploymentFrequency))}`}
                      >
                        级别: {getDoraLevel("deploymentFrequency", doraValues.deploymentFrequency)}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lt">变更前置时间（天）</Label>
                    <Input
                      id="lt"
                      type="number"
                      placeholder="例如: 3"
                      value={doraValues.leadTime}
                      onChange={(e) => setDoraValues({ ...doraValues, leadTime: e.target.value })}
                    />
                    {doraValues.leadTime && (
                      <p className={`text-sm ${getLevelColor(getDoraLevel("leadTime", doraValues.leadTime))}`}>
                        级别: {getDoraLevel("leadTime", doraValues.leadTime)}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cfr">变更失败率（%）</Label>
                    <Input
                      id="cfr"
                      type="number"
                      placeholder="例如: 10"
                      value={doraValues.changeFailureRate}
                      onChange={(e) => setDoraValues({ ...doraValues, changeFailureRate: e.target.value })}
                    />
                    {doraValues.changeFailureRate && (
                      <p
                        className={`text-sm ${getLevelColor(getDoraLevel("changeFailureRate", doraValues.changeFailureRate))}`}
                      >
                        级别: {getDoraLevel("changeFailureRate", doraValues.changeFailureRate)}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mttr">服务恢复时间（小时）</Label>
                    <Input
                      id="mttr"
                      type="number"
                      placeholder="例如: 2"
                      value={doraValues.mttr}
                      onChange={(e) => setDoraValues({ ...doraValues, mttr: e.target.value })}
                    />
                    {doraValues.mttr && (
                      <p className={`text-sm ${getLevelColor(getDoraLevel("mttr", doraValues.mttr))}`}>
                        级别: {getDoraLevel("mttr", doraValues.mttr)}
                      </p>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() =>
                      setDoraValues({ deploymentFrequency: "", leadTime: "", changeFailureRate: "", mttr: "" })
                    }
                    className="w-full gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    重置
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>指标说明</CardTitle>
                  <CardDescription>了解每个 DORA 指标的含义和基准</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {doraMetrics.map((metric) => (
                    <div key={metric.id} className="rounded-lg border border-border p-4">
                      <h4 className="mb-1 font-medium">{metric.name}</h4>
                      <p className="mb-2 text-sm text-muted-foreground">{metric.description}</p>
                      <p className="text-xs text-muted-foreground">
                        <strong>基准:</strong> {metric.benchmark}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Platform Maturity Assessment */}
          <TabsContent value="platform-maturity">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>平台成熟度评估</CardTitle>
                    <CardDescription>回答以下问题，评估你的平台工程成熟度</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {platformMaturityQuestions.map((q, index) => (
                      <div key={q.id} className="space-y-4">
                        <div className="flex items-start gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium">{q.question}</p>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {q.category}
                            </Badge>
                          </div>
                        </div>
                        <RadioGroup
                          value={maturityAnswers[q.id]?.toString()}
                          onValueChange={(value) => {
                            setMaturityAnswers({ ...maturityAnswers, [q.id]: Number.parseInt(value) })
                            setShowMaturityResult(false)
                          }}
                          className="ml-9 space-y-2"
                        >
                          {q.options.map((option) => (
                            <div
                              key={option.value}
                              className="flex items-start space-x-3 rounded-lg border border-border p-3 hover:bg-secondary/50"
                            >
                              <RadioGroupItem value={option.value.toString()} id={`${q.id}-${option.value}`} />
                              <Label htmlFor={`${q.id}-${option.value}`} className="cursor-pointer">
                                <span className="font-medium">{option.label}</span>
                                {option.description && (
                                  <p className="text-sm text-muted-foreground">{option.description}</p>
                                )}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}

                    <div className="flex gap-4">
                      <Button
                        onClick={() => setShowMaturityResult(true)}
                        disabled={Object.keys(maturityAnswers).length < platformMaturityQuestions.length}
                        className="gap-2"
                      >
                        查看结果 <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setMaturityAnswers({})
                          setShowMaturityResult(false)
                        }}
                        className="gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        重置
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>评估结果</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {showMaturityResult ? (
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className={`text-4xl font-bold ${getMaturityLevel(calculateMaturityScore()).color}`}>
                            {Math.round(calculateMaturityScore())}%
                          </p>
                          <p className={`text-lg font-medium ${getMaturityLevel(calculateMaturityScore()).color}`}>
                            {getMaturityLevel(calculateMaturityScore()).level}
                          </p>
                        </div>
                        <Progress value={calculateMaturityScore()} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          你的平台工程成熟度处于 {getMaturityLevel(calculateMaturityScore()).level} 阶段。
                          继续关注自动化、自助服务和开发者体验，持续提升平台能力。
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">完成所有问题后查看评估结果</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          已完成 {Object.keys(maturityAnswers).length} / {platformMaturityQuestions.length}
                        </p>
                        <Progress
                          value={(Object.keys(maturityAnswers).length / platformMaturityQuestions.length) * 100}
                          className="mt-4 h-2"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Platform ROI Calculator */}
          <TabsContent value="platform-roi">
            <ROICalculator />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

function ROICalculator() {
  const [values, setValues] = useState({
    developerCount: "",
    avgSalary: "",
    timeSavedPerWeek: "",
    platformCost: "",
  })

  const calculateROI = () => {
    const devCount = Number.parseFloat(values.developerCount) || 0
    const salary = Number.parseFloat(values.avgSalary) || 0
    const timeSaved = Number.parseFloat(values.timeSavedPerWeek) || 0
    const cost = Number.parseFloat(values.platformCost) || 0

    const hourlyRate = salary / 52 / 40
    const annualSavings = devCount * timeSaved * 52 * hourlyRate
    const roi = cost > 0 ? ((annualSavings - cost) / cost) * 100 : 0

    return {
      annualSavings: annualSavings.toFixed(0),
      roi: roi.toFixed(0),
      paybackMonths: cost > 0 ? ((cost / annualSavings) * 12).toFixed(1) : 0,
    }
  }

  const results = calculateROI()

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>平台 ROI 计算器</CardTitle>
          <CardDescription>估算平台工程投资的回报率</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dev-count">开发者数量</Label>
            <Input
              id="dev-count"
              type="number"
              placeholder="例如: 50"
              value={values.developerCount}
              onChange={(e) => setValues({ ...values, developerCount: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary">平均年薪（元）</Label>
            <Input
              id="salary"
              type="number"
              placeholder="例如: 400000"
              value={values.avgSalary}
              onChange={(e) => setValues({ ...values, avgSalary: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-saved">每人每周节省时间（小时）</Label>
            <Input
              id="time-saved"
              type="number"
              placeholder="例如: 4"
              value={values.timeSavedPerWeek}
              onChange={(e) => setValues({ ...values, timeSavedPerWeek: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="platform-cost">平台年度成本（元）</Label>
            <Input
              id="platform-cost"
              type="number"
              placeholder="例如: 500000"
              value={values.platformCost}
              onChange={(e) => setValues({ ...values, platformCost: e.target.value })}
            />
          </div>

          <Button
            variant="outline"
            onClick={() => setValues({ developerCount: "", avgSalary: "", timeSavedPerWeek: "", platformCost: "" })}
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            重置
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>计算结果</CardTitle>
          <CardDescription>基于你的输入估算的投资回报</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">年度节省成本</p>
            <p className="text-3xl font-bold text-primary">
              ¥{Number.parseInt(results.annualSavings).toLocaleString()}
            </p>
          </div>

          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">投资回报率 (ROI)</p>
            <p
              className={`text-3xl font-bold ${Number.parseFloat(results.roi) > 0 ? "text-green-400" : "text-red-400"}`}
            >
              {results.roi}%
            </p>
          </div>

          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">投资回收期</p>
            <p className="text-3xl font-bold">{results.paybackMonths} 个月</p>
          </div>

          <p className="text-xs text-muted-foreground">
            * 此计算仅为估算，实际收益可能因多种因素而异。建议结合实际情况进行更详细的评估。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
