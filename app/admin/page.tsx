"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart3, Users, Star, TrendingUp, MessageSquare, ArrowLeft, AlertTriangle, CheckCircle, Clock, Target, TrendingDown, Award, ThumbsUp, ThumbsDown, Zap } from 'lucide-react'
import Link from "next/link"

// Genişletilmiş örnek veri
const mockSurveyData = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    email: "ahmet@email.com",
    roomNumber: "101",
    guestType: "business",
    nationality: "tr",
    
    // Rezervasyon & Varış
    reservationProcess: "5",
    checkInExperience: "4",
    frontDeskService: "5",
    
    // Konaklama
    roomCleanliness: "5",
    roomComfort: "4",
    bedQuality: "5",
    wifiQuality: "3",
    
    // Hizmet Kalitesi
    staffFriendliness: "5",
    staffProfessionalism: "4",
    housekeepingService: "5",
    
    // Yemek & İçecek
    restaurantQuality: "4",
    breakfastQuality: "5",
    
    // Genel
    overallSatisfaction: "5",
    valueForMoney: "4",
    locationRating: "5",
    recommend: "definitely",
    returnIntent: "definitely",
    
    positiveAspects: "Personel çok güler yüzlü, oda temizliği mükemmel",
    improvementAreas: "Wi-Fi hızı artırılabilir",
    additionalComments: "Genel olarak harika bir deneyim",
    
    usedServices: ["Resepsiyon", "Ana Restoran", "Oda Servisi"],
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@email.com",
    roomNumber: "205",
    guestType: "leisure",
    nationality: "us",
    
    reservationProcess: "4",
    checkInExperience: "3",
    frontDeskService: "3",
    
    roomCleanliness: "4",
    roomComfort: "3",
    bedQuality: "4",
    wifiQuality: "2",
    
    staffFriendliness: "4",
    staffProfessionalism: "3",
    housekeepingService: "4",
    
    restaurantQuality: "3",
    breakfastQuality: "3",
    
    overallSatisfaction: "3",
    valueForMoney: "3",
    locationRating: "4",
    recommend: "maybe",
    returnIntent: "maybe",
    
    positiveAspects: "Güzel konum, temiz odalar",
    improvementAreas: "Personel eğitimi, Wi-Fi kalitesi, kahvaltı çeşitliliği",
    additionalComments: "Ortalama bir deneyim, geliştirilmesi gereken alanlar var",
    
    usedServices: ["Resepsiyon", "Ana Restoran", "Bar"],
    date: "2024-01-14"
  },
  {
    id: 3,
    name: "Hans Mueller",
    email: "hans@email.com",
    roomNumber: "312",
    guestType: "family",
    nationality: "de",
    
    reservationProcess: "2",
    checkInExperience: "2",
    frontDeskService: "2",
    
    roomCleanliness: "3",
    roomComfort: "2",
    bedQuality: "2",
    wifiQuality: "1",
    
    staffFriendliness: "2",
    staffProfessionalism: "2",
    housekeepingService: "3",
    
    restaurantQuality: "2",
    breakfastQuality: "2",
    
    overallSatisfaction: "2",
    valueForMoney: "2",
    locationRating: "3",
    recommend: "no",
    returnIntent: "no",
    
    positiveAspects: "Konum iyi",
    improvementAreas: "Personel eğitimi acil, Wi-Fi tamamen değişmeli, yemek kalitesi çok kötü, odalar yenilenmeli",
    additionalComments: "Çok hayal kırıklığı yaşadık, beklentilerimizi karşılamadı",
    
    usedServices: ["Resepsiyon", "Ana Restoran"],
    date: "2024-01-13"
  }
]

export default function AdminPage() {
  const [surveys, setSurveys] = useState(mockSurveyData)
  const [stats, setStats] = useState({
    totalSurveys: 0,
    averageRating: 0,
    recommendationRate: 0,
    returnIntentRate: 0,
    criticalIssues: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    departmentScores: {},
    improvementAreas: [],
    topPositives: [],
    criticalFeedback: []
  })

  useEffect(() => {
    calculateStats()
  }, [surveys])

  const calculateStats = () => {
    const totalSurveys = surveys.length
    if (totalSurveys === 0) return

    // Temel istatistikler
    const totalRating = surveys.reduce((sum, survey) => sum + parseInt(survey.overallSatisfaction), 0)
    const averageRating = (totalRating / totalSurveys).toFixed(1)
    
    const recommendCount = surveys.filter(s => s.recommend === "definitely" || s.recommend === "probably").length
    const recommendationRate = Math.round((recommendCount / totalSurveys) * 100)
    
    const returnCount = surveys.filter(s => s.returnIntent === "definitely" || s.returnIntent === "probably").length
    const returnIntentRate = Math.round((returnCount / totalSurveys) * 100)
    
    const criticalIssues = surveys.filter(s => parseInt(s.overallSatisfaction) <= 2).length

    // Puan dağılımı
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    surveys.forEach(survey => {
      const rating = parseInt(survey.overallSatisfaction)
      ratingDistribution[rating]++
    })

    // Departman skorları
    const departmentFields = {
      'Resepsiyon': ['reservationProcess', 'checkInExperience', 'frontDeskService'],
      'Oda Hizmetleri': ['roomCleanliness', 'roomComfort', 'bedQuality'],
      'Personel': ['staffFriendliness', 'staffProfessionalism'],
      'Temizlik': ['housekeepingService', 'roomCleanliness'],
      'Yemek & İçecek': ['restaurantQuality', 'breakfastQuality'],
      'Teknik': ['wifiQuality']
    }

    const departmentScores = {}
    Object.entries(departmentFields).forEach(([dept, fields]) => {
      const scores = surveys.flatMap(survey => 
        fields.map(field => parseInt(survey[field]) || 0).filter(score => score > 0)
      )
      if (scores.length > 0) {
        departmentScores[dept] = (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1)
      }
    })

    // Geliştirilmesi gereken alanlar analizi
    const improvementMentions = {}
    surveys.forEach(survey => {
      if (survey.improvementAreas) {
        const areas = survey.improvementAreas.toLowerCase()
        // Anahtar kelime analizi
        const keywords = {
          'Wi-Fi': ['wifi', 'internet', 'bağlantı'],
          'Personel Eğitimi': ['personel', 'eğitim', 'hizmet kalitesi'],
          'Yemek Kalitesi': ['yemek', 'kahvaltı', 'restoran', 'menü'],
          'Oda Konforu': ['oda', 'yatak', 'konfor', 'mobilya'],
          'Temizlik': ['temizlik', 'hijyen'],
          'Check-in Süreci': ['check-in', 'giriş', 'resepsiyon'],
          'Fiyat': ['fiyat', 'ücret', 'pahalı']
        }
        
        Object.entries(keywords).forEach(([area, words]) => {
          if (words.some(word => areas.includes(word))) {
            improvementMentions[area] = (improvementMentions[area] || 0) + 1
          }
        })
      }
    })

    const improvementAreas = Object.entries(improvementMentions)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([area, count]) => ({ area, count, percentage: Math.round((count / totalSurveys) * 100) }))

    // En çok beğenilen yönler
    const positiveMentions = {}
    surveys.forEach(survey => {
      if (survey.positiveAspects) {
        const aspects = survey.positiveAspects.toLowerCase()
        const keywords = {
          'Personel': ['personel', 'güler yüz', 'yardımsever'],
          'Temizlik': ['temiz', 'hijyen', 'temizlik'],
          'Konum': ['konum', 'lokasyon', 'merkez'],
          'Konfor': ['konfor', 'rahat', 'yatak'],
          'Hizmet': ['hizmet', 'servis'],
          'Yemek': ['yemek', 'lezzetli', 'kahvaltı']
        }
        
        Object.entries(keywords).forEach(([aspect, words]) => {
          if (words.some(word => aspects.includes(word))) {
            positiveMentions[aspect] = (positiveMentions[aspect] || 0) + 1
          }
        })
      }
    })

    const topPositives = Object.entries(positiveMentions)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([aspect, count]) => ({ aspect, count, percentage: Math.round((count / totalSurveys) * 100) }))

    // Kritik geri bildirimler
    const criticalFeedback = surveys
      .filter(s => parseInt(s.overallSatisfaction) <= 2)
      .map(s => ({
        name: s.name,
        room: s.roomNumber,
        rating: s.overallSatisfaction,
        issues: s.improvementAreas,
        date: s.date
      }))

    setStats({
      totalSurveys,
      averageRating: parseFloat(averageRating),
      recommendationRate,
      returnIntentRate,
      criticalIssues,
      ratingDistribution,
      departmentScores,
      improvementAreas,
      topPositives,
      criticalFeedback
    })
  }

  const getRatingColor = (rating: string | number) => {
    const num = typeof rating === 'string' ? parseFloat(rating) : rating
    if (num >= 4) return "text-green-600"
    if (num >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  const getRatingBgColor = (rating: string | number) => {
    const num = typeof rating === 'string' ? parseFloat(rating) : rating
    if (num >= 4) return "bg-green-100"
    if (num >= 3) return "bg-yellow-100"
    return "bg-red-100"
  }

  const getPriorityLevel = (percentage: number) => {
    if (percentage >= 30) return { level: "Yüksek", color: "bg-red-500", icon: AlertTriangle }
    if (percentage >= 15) return { level: "Orta", color: "bg-yellow-500", icon: Clock }
    return { level: "Düşük", color: "bg-green-500", icon: CheckCircle }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Müşteri Deneyimi Analizi</h1>
            <p className="text-gray-600">Detaylı performans raporları ve aksiyon planları</p>
          </div>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ana Sayfa
            </Button>
          </Link>
        </div>

        {/* Kritik Uyarılar */}
        {stats.criticalIssues > 0 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Dikkat:</strong> {stats.criticalIssues} müşteri çok düşük puan verdi. 
              Acil müdahale gerekebilir.
            </AlertDescription>
          </Alert>
        )}

        {/* Ana İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Anket</p>
                  <p className="text-2xl font-bold">{stats.totalSurveys}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ortalama Puan</p>
                  <p className={`text-2xl font-bold flex items-center gap-1 ${getRatingColor(stats.averageRating)}`}>
                    {stats.averageRating}
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tavsiye Oranı</p>
                  <p className="text-2xl font-bold">{stats.recommendationRate}%</p>
                </div>
                <ThumbsUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tekrar Gelme</p>
                  <p className="text-2xl font-bold">{stats.returnIntentRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Kritik Durumlar</p>
                  <p className="text-2xl font-bold text-red-600">{stats.criticalIssues}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Memnuniyet</p>
                  <p className={`text-2xl font-bold ${stats.averageRating >= 4 ? 'text-green-600' : stats.averageRating >= 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {stats.averageRating >= 4 ? 'İyi' : stats.averageRating >= 3 ? 'Orta' : 'Kötü'}
                  </p>
                </div>
                <Award className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="departments">Departmanlar</TabsTrigger>
            <TabsTrigger value="improvements">Gelişim Alanları</TabsTrigger>
            <TabsTrigger value="critical">Kritik Durumlar</TabsTrigger>
            <TabsTrigger value="surveys">Anketler</TabsTrigger>
            <TabsTrigger value="actions">Aksiyon Planı</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Puan Dağılımı */}
              <Card>
                <CardHeader>
                  <CardTitle>Memnuniyet Dağılımı</CardTitle>
                  <CardDescription>Müşteri puanlarının detaylı analizi</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(stats.ratingDistribution).reverse().map(([rating, count]) => (
                    <div key={rating} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-12">
                        <span className={getRatingColor(rating)}>{rating}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <Progress 
                        value={stats.totalSurveys > 0 ? (count / stats.totalSurveys) * 100 : 0} 
                        className="flex-1" 
                      />
                      <span className="text-sm text-gray-600 w-16">{count} (%{Math.round((count / stats.totalSurveys) * 100)})</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* En Beğenilen Yönler */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5 text-green-600" />
                    En Beğenilen Yönler
                  </CardTitle>
                  <CardDescription>Müşterilerin en çok takdir ettiği özellikler</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.topPositives.map((positive, index) => (
                    <div key={positive.aspect} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-green-700">#{index + 1}</span>
                        </div>
                        <span className="font-medium">{positive.aspect}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-700">{positive.count}</div>
                        <div className="text-xs text-green-600">%{positive.percentage}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <CardTitle>Departman Performans Analizi</CardTitle>
                <CardDescription>Her departmanın detaylı performans değerlendirmesi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(stats.departmentScores).map(([department, score]) => {
                    const numScore = parseFloat(score)
                    const percentage = (numScore / 5) * 100
                    return (
                      <div key={department} className={`p-6 rounded-lg border-2 ${getRatingBgColor(numScore)}`}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-lg">{department}</h3>
                          <div className={`text-2xl font-bold ${getRatingColor(numScore)}`}>
                            {score}/5
                          </div>
                        </div>
                        <Progress value={percentage} className="mb-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Performans</span>
                          <span className={`font-medium ${getRatingColor(numScore)}`}>
                            {numScore >= 4 ? 'Mükemmel' : numScore >= 3.5 ? 'İyi' : numScore >= 3 ? 'Orta' : numScore >= 2 ? 'Zayıf' : 'Kritik'}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="improvements">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Geliştirilmesi Gereken Alanlar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-orange-600" />
                    Öncelikli Gelişim Alanları
                  </CardTitle>
                  <CardDescription>Müşteri geri bildirimlerine göre acil müdahale gereken konular</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.improvementAreas.map((area, index) => {
                    const priority = getPriorityLevel(area.percentage)
                    const PriorityIcon = priority.icon
                    return (
                      <div key={area.area} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 ${priority.color} rounded-full flex items-center justify-center`}>
                              <PriorityIcon className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{area.area}</h4>
                              <p className="text-sm text-gray-600">Öncelik: {priority.level}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-red-600">{area.count}</div>
                            <div className="text-xs text-red-500">%{area.percentage} müşteri</div>
                          </div>
                        </div>
                        <Progress value={area.percentage} className="mb-2" />
                        <div className="text-sm text-gray-600">
                          {area.percentage >= 30 && "Acil müdahale gerekiyor"}
                          {area.percentage >= 15 && area.percentage < 30 && "Kısa vadede çözülmeli"}
                          {area.percentage < 15 && "İzlenmeli ve iyileştirilmeli"}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Aksiyon Önerileri */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    Önerilen Aksiyonlar
                  </CardTitle>
                  <CardDescription>Her gelişim alanı için önerilen çözümler</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stats.improvementAreas.slice(0, 3).map((area) => {
                    const actions = {
                      'Wi-Fi': [
                        'İnternet altyapısını yenileyin',
                        'Wi-Fi erişim noktalarını artırın',
                        'Bant genişliğini yükseltin'
                      ],
                      'Personel Eğitimi': [
                        'Müşteri hizmetleri eğitimi düzenleyin',
                        'İletişim becerilerini geliştirin',
                        'Performans değerlendirme sistemi kurun'
                      ],
                      'Yemek Kalitesi': [
                        'Menüyü yenileyin',
                        'Şef eğitimi organize edin',
                        'Malzeme kalitesini artırın'
                      ]
                    }
                    
                    const actionList = actions[area.area] || ['Detaylı analiz yapın', 'Uzman görüşü alın', 'Pilot uygulama başlatın']
                    
                    return (
                      <div key={area.area} className="border rounded-lg p-4 bg-blue-50">
                        <h4 className="font-semibold mb-3 text-blue-900">{area.area}</h4>
                        <ul className="space-y-2">
                          {actionList.map((action, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-blue-600" />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="critical">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-5 w-5" />
                  Kritik Geri Bildirimler
                </CardTitle>
                <CardDescription>Acil müdahale gerektiren düşük puanlı değerlendirmeler</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.criticalFeedback.length > 0 ? (
                  <div className="space-y-4">
                    {stats.criticalFeedback.map((feedback, index) => (
                      <div key={index} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-red-900">{feedback.name}</h4>
                            <p className="text-sm text-red-700">Oda: {feedback.room} • {feedback.date}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-red-100 px-3 py-1 rounded-full">
                            <span className="text-lg font-bold text-red-700">{feedback.rating}</span>
                            <Star className="h-4 w-4 text-red-500" />
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded border-l-2 border-red-200">
                          <p className="text-sm text-gray-800">
                            <strong>Sorunlar:</strong> {feedback.issues}
                          </p>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Badge className="bg-red-100 text-red-800">Acil Müdahale</Badge>
                          <Badge className="bg-orange-100 text-orange-800">Takip Gerekli</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-700">Harika Haber!</h3>
                    <p className="text-green-600">Şu anda kritik seviyede geri bildirim bulunmuyor.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="surveys">
            <Card>
              <CardHeader>
                <CardTitle>Detaylı Anket Sonuçları</CardTitle>
                <CardDescription>Tüm müşteri anketlerinin kapsamlı listesi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {surveys.map((survey) => (
                    <div key={survey.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{survey.name}</h3>
                          <p className="text-sm text-gray-600">
                            Oda: {survey.roomNumber} • {survey.guestType} • {survey.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${getRatingBgColor(survey.overallSatisfaction)}`}>
                            <span className={`font-bold ${getRatingColor(survey.overallSatisfaction)}`}>
                              {survey.overallSatisfaction}
                            </span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </div>
                          {survey.recommend === "definitely" && <Badge className="bg-green-100 text-green-800">Kesinlikle Tavsiye</Badge>}
                          {survey.recommend === "probably" && <Badge className="bg-blue-100 text-blue-800">Tavsiye Ediyor</Badge>}
                          {survey.recommend === "maybe" && <Badge className="bg-yellow-100 text-yellow-800">Kararsız</Badge>}
                          {survey.recommend === "no" && <Badge className="bg-red-100 text-red-800">Tavsiye Etmiyor</Badge>}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600">Rezervasyon:</span>
                          <span className={`ml-2 font-medium ${getRatingColor(survey.reservationProcess)}`}>
                            {survey.reservationProcess}/5
                          </span>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600">Check-in:</span>
                          <span className={`ml-2 font-medium ${getRatingColor(survey.checkInExperience)}`}>
                            {survey.checkInExperience}/5
                          </span>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600">Oda:</span>
                          <span className={`ml-2 font-medium ${getRatingColor(survey.roomComfort)}`}>
                            {survey.roomComfort}/5
                          </span>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600">Personel:</span>
                          <span className={`ml-2 font-medium ${getRatingColor(survey.staffFriendliness)}`}>
                            {survey.staffFriendliness}/5
                          </span>
                        </div>
                      </div>
                      
                      {survey.usedServices.length > 0 && (
                        <div className="mb-4">
                          <span className="text-sm font-medium text-gray-700">Kullanılan Hizmetler: </span>
                          {survey.usedServices.map((service) => (
                            <Badge key={service} variant="secondary" className="mr-1 mb-1">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        {survey.positiveAspects && (
                          <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                            <p className="text-sm">
                              <strong className="text-green-800">Beğenilen Yönler:</strong>
                              <span className="text-green-700 ml-2">{survey.positiveAspects}</span>
                            </p>
                          </div>
                        )}
                        
                        {survey.improvementAreas && (
                          <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
                            <p className="text-sm">
                              <strong className="text-orange-800">Gelişim Alanları:</strong>
                              <span className="text-orange-700 ml-2">{survey.improvementAreas}</span>
                            </p>
                          </div>
                        )}
                        
                        {survey.additionalComments && (
                          <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                            <p className="text-sm">
                              <strong className="text-blue-800">Ek Yorumlar:</strong>
                              <span className="text-blue-700 ml-2">{survey.additionalComments}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Kısa Vadeli Aksiyonlar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    Kısa Vadeli Aksiyonlar (1-4 Hafta)
                  </CardTitle>
                  <CardDescription>Hemen uygulanabilir iyileştirmeler</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 bg-orange-50">
                    <h4 className="font-semibold text-orange-900 mb-2">Wi-Fi İyileştirmeleri</h4>
                    <ul className="space-y-1 text-sm text-orange-800">
                      <li>• Mevcut router'ları yeniden konumlandır</li>
                      <li>• Bant genişliğini geçici olarak artır</li>
                      <li>• Misafir ağını optimize et</li>
                    </ul>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge className="bg-orange-100 text-orange-800">Yüksek Öncelik</Badge>
                      <span className="text-xs text-orange-600">Tahmini Maliyet: ₺5,000</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-blue-50">
                    <h4 className="font-semibold text-blue-900 mb-2">Personel Eğitimi</h4>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>• Müşteri karşılama eğitimi düzenle</li>
                      <li>• Check-in süreçlerini hızlandır</li>
                      <li>• İletişim becerilerini geliştir</li>
                    </ul>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">Orta Öncelik</Badge>
                      <span className="text-xs text-blue-600">Tahmini Maliyet: ₺3,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Uzun Vadeli Aksiyonlar */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Uzun Vadeli Aksiyonlar (1-6 Ay)
                  </CardTitle>
                  <CardDescription>Stratejik iyileştirme projeleri</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 bg-green-50">
                    <h4 className="font-semibold text-green-900 mb-2">Oda Yenileme Projesi</h4>
                    <ul className="space-y-1 text-sm text-green-800">
                      <li>• Yatak ve mobilyaları yenile</li>
                      <li>• Banyo donanımlarını güncelle</li>
                      <li>• Ses yalıtımını iyileştir</li>
                    </ul>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Stratejik</Badge>
                      <span className="text-xs text-green-600">Tahmini Maliyet: ₺150,000</span>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-purple-50">
                    <h4 className="font-semibold text-purple-900 mb-2">Teknoloji Altyapısı</h4>
                    <ul className="space-y-1 text-sm text-purple-800">
                      <li>• Fiber internet altyapısı kur</li>
                      <li>• Akıllı oda sistemleri ekle</li>
                      <li>• Mobil check-in sistemi geliştir</li>
                    </ul>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-800">İnovasyon</Badge>
                      <span className="text-xs text-purple-600">Tahmini Maliyet: ₺75,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ROI Hesaplaması */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Yatırım Getirisi Analizi
                </CardTitle>
                <CardDescription>Önerilen iyileştirmelerin potansiel etkisi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700 mb-2">+0.8</div>
                    <div className="text-sm text-blue-600">Puan Artışı Beklentisi</div>
                    <div className="text-xs text-gray-600 mt-1">Mevcut 3.3 → Hedef 4.1</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700 mb-2">+25%</div>
                    <div className="text-sm text-green-600">Tavsiye Oranı Artışı</div>
                    <div className="text-xs text-gray-600 mt-1">Mevcut 67% → Hedef 92%</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700 mb-2">+30%</div>
                    <div className="text-sm text-purple-600">Tekrar Gelme Oranı</div>
                    <div className="text-xs text-gray-600 mt-1">Mevcut 67% → Hedef 87%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
