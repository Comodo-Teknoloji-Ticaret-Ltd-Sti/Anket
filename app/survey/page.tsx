"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Star, Hotel, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react'

const surveySteps = [
  { id: 1, title: "Kişisel Bilgiler", description: "Temel bilgileriniz" },
  { id: 2, title: "Rezervasyon & Varış", description: "Rezervasyon ve check-in deneyimi" },
  { id: 3, title: "Konaklama Deneyimi", description: "Oda ve otel olanakları" },
  { id: 4, title: "Hizmet Kalitesi", description: "Personel ve hizmet değerlendirmesi" },
  { id: 5, title: "Yemek & İçecek", description: "Restoran ve bar hizmetleri" },
  { id: 6, title: "Genel Değerlendirme", description: "Genel memnuniyet ve öneriler" }
]

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Kişisel Bilgiler
    name: "",
    email: "",
    phone: "",
    nationality: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestType: "",
    
    // Rezervasyon & Varış
    reservationProcess: "",
    reservationChannel: "",
    checkInExperience: "",
    checkInWaitTime: "",
    frontDeskService: "",
    roomReadiness: "",
    
    // Konaklama Deneyimi
    roomCleanliness: "",
    roomComfort: "",
    roomAmenities: "",
    bedQuality: "",
    bathroomQuality: "",
    roomQuietness: "",
    roomTemperature: "",
    wifiQuality: "",
    tvChannels: "",
    roomService: "",
    
    // Hizmet Kalitesi
    staffFriendliness: "",
    staffProfessionalism: "",
    staffResponseTime: "",
    conciergeService: "",
    housekeepingService: "",
    maintenanceService: "",
    securityService: "",
    
    // Yemek & İçecek
    restaurantQuality: "",
    restaurantService: "",
    restaurantVariety: "",
    breakfastQuality: "",
    barService: "",
    roomServiceQuality: "",
    foodPricing: "",
    
    // Genel Değerlendirme
    overallSatisfaction: "",
    valueForMoney: "",
    locationRating: "",
    facilitiesRating: "",
    cleanlinessOverall: "",
    recommend: "",
    returnIntent: "",
    
    // Kullanılan Hizmetler
    usedServices: [],
    
    // Yorumlar ve Öneriler
    positiveAspects: "",
    improvementAreas: "",
    additionalComments: "",
    specialRequests: ""
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      usedServices: checked 
        ? [...prev.usedServices, service]
        : prev.usedServices.filter(s => s !== service)
    }))
  }

  const nextStep = () => {
    if (currentStep < surveySteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simüle edilmiş API çağrısı
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Detaylı anket verisi:", formData)
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const RatingScale = ({ value, onChange, label }: { value: string, onChange: (value: string) => void, label: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <RadioGroup value={value} onValueChange={onChange} className="flex justify-between">
        {[1,2,3,4,5].map((rating) => (
          <div key={rating} className="flex flex-col items-center space-y-1">
            <RadioGroupItem value={rating.toString()} id={`${label}-${rating}`} />
            <Label htmlFor={`${label}-${rating}`} className="text-xs flex items-center gap-1">
              {rating} <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Çok Kötü</span>
        <span>Mükemmel</span>
      </div>
    </div>
  )

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-green-700 mb-4">Teşekkür Ederiz!</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Değerli görüşleriniz bizim için çok önemli. Geri bildiriminiz kaydedildi ve 
              hizmet kalitemizi artırmak için değerlendirilecek.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-800">
                Ankete katıldığınız için teşekkürler. Görüşleriniz doğrultusunda 
                hizmetlerimizi sürekli geliştirmeye devam ediyoruz.
              </p>
            </div>
            <Button onClick={() => window.location.href = "/"} className="w-full">
              Ana Sayfaya Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = (currentStep / surveySteps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Hotel className="h-10 w-10 text-blue-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Müşteri Deneyimi Anketi</h1>
              <p className="text-gray-600 mt-1">Görüşleriniz bizim için değerli</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Adım {currentStep} / {surveySteps.length}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Tamamlandı</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-blue-600 mt-2 font-medium">
              {surveySteps[currentStep - 1].title}: {surveySteps[currentStep - 1].description}
            </p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-xl">
              {surveySteps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-blue-100">
              {surveySteps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Step 1: Kişisel Bilgiler */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Ad Soyad *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Adınız ve soyadınız"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="ornek@email.com"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+90 5XX XXX XX XX"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Uyruğunuz</Label>
                    <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tr">Türkiye</SelectItem>
                        <SelectItem value="de">Almanya</SelectItem>
                        <SelectItem value="uk">İngiltere</SelectItem>
                        <SelectItem value="fr">Fransa</SelectItem>
                        <SelectItem value="us">ABD</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="roomNumber">Oda Numarası *</Label>
                    <Input
                      id="roomNumber"
                      value={formData.roomNumber}
                      onChange={(e) => handleInputChange('roomNumber', e.target.value)}
                      placeholder="Örn: 205"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="checkInDate">Giriş Tarihi</Label>
                    <Input
                      id="checkInDate"
                      type="date"
                      value={formData.checkInDate}
                      onChange={(e) => handleInputChange('checkInDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkOutDate">Çıkış Tarihi</Label>
                    <Input
                      id="checkOutDate"
                      type="date"
                      value={formData.checkOutDate}
                      onChange={(e) => handleInputChange('checkOutDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Misafir Tipi</Label>
                    <Select value={formData.guestType} onValueChange={(value) => handleInputChange('guestType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">İş Seyahati</SelectItem>
                        <SelectItem value="leisure">Tatil</SelectItem>
                        <SelectItem value="family">Aile Tatili</SelectItem>
                        <SelectItem value="couple">Çift Tatili</SelectItem>
                        <SelectItem value="group">Grup Seyahati</SelectItem>
                        <SelectItem value="conference">Konferans/Etkinlik</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Rezervasyon & Varış */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <RatingScale
                      value={formData.reservationProcess}
                      onChange={(value) => handleInputChange('reservationProcess', value)}
                      label="Rezervasyon Süreci"
                    />
                    
                    <div>
                      <Label>Rezervasyon Kanalı</Label>
                      <Select value={formData.reservationChannel} onValueChange={(value) => handleInputChange('reservationChannel', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Nasıl rezervasyon yaptınız?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Otel Web Sitesi</SelectItem>
                          <SelectItem value="booking">Booking.com</SelectItem>
                          <SelectItem value="expedia">Expedia</SelectItem>
                          <SelectItem value="phone">Telefon</SelectItem>
                          <SelectItem value="travel-agent">Seyahat Acentesi</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <RatingScale
                      value={formData.checkInExperience}
                      onChange={(value) => handleInputChange('checkInExperience', value)}
                      label="Check-in Deneyimi"
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label>Check-in Bekleme Süresi</Label>
                      <Select value={formData.checkInWaitTime} onValueChange={(value) => handleInputChange('checkInWaitTime', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Ne kadar beklediniz?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-2">0-2 dakika</SelectItem>
                          <SelectItem value="3-5">3-5 dakika</SelectItem>
                          <SelectItem value="6-10">6-10 dakika</SelectItem>
                          <SelectItem value="11-15">11-15 dakika</SelectItem>
                          <SelectItem value="15+">15+ dakika</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <RatingScale
                      value={formData.frontDeskService}
                      onChange={(value) => handleInputChange('frontDeskService', value)}
                      label="Resepsiyon Hizmeti"
                    />

                    <RatingScale
                      value={formData.roomReadiness}
                      onChange={(value) => handleInputChange('roomReadiness', value)}
                      label="Oda Hazırlığı"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Konaklama Deneyimi */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Oda Kalitesi</h3>
                    
                    <RatingScale
                      value={formData.roomCleanliness}
                      onChange={(value) => handleInputChange('roomCleanliness', value)}
                      label="Oda Temizliği"
                    />

                    <RatingScale
                      value={formData.roomComfort}
                      onChange={(value) => handleInputChange('roomComfort', value)}
                      label="Oda Konforu"
                    />

                    <RatingScale
                      value={formData.bedQuality}
                      onChange={(value) => handleInputChange('bedQuality', value)}
                      label="Yatak Kalitesi"
                    />

                    <RatingScale
                      value={formData.bathroomQuality}
                      onChange={(value) => handleInputChange('bathroomQuality', value)}
                      label="Banyo Kalitesi"
                    />

                    <RatingScale
                      value={formData.roomQuietness}
                      onChange={(value) => handleInputChange('roomQuietness', value)}
                      label="Oda Sessizliği"
                    />
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Oda Olanakları</h3>
                    
                    <RatingScale
                      value={formData.roomAmenities}
                      onChange={(value) => handleInputChange('roomAmenities', value)}
                      label="Oda Donanımları"
                    />

                    <RatingScale
                      value={formData.roomTemperature}
                      onChange={(value) => handleInputChange('roomTemperature', value)}
                      label="Klima/Isıtma"
                    />

                    <RatingScale
                      value={formData.wifiQuality}
                      onChange={(value) => handleInputChange('wifiQuality', value)}
                      label="Wi-Fi Kalitesi"
                    />

                    <RatingScale
                      value={formData.tvChannels}
                      onChange={(value) => handleInputChange('tvChannels', value)}
                      label="TV ve Kanallar"
                    />

                    <RatingScale
                      value={formData.roomService}
                      onChange={(value) => handleInputChange('roomService', value)}
                      label="Oda Servisi"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Hizmet Kalitesi */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personel Değerlendirmesi</h3>
                    
                    <RatingScale
                      value={formData.staffFriendliness}
                      onChange={(value) => handleInputChange('staffFriendliness', value)}
                      label="Personel Güler Yüzlülüğü"
                    />

                    <RatingScale
                      value={formData.staffProfessionalism}
                      onChange={(value) => handleInputChange('staffProfessionalism', value)}
                      label="Personel Profesyonelliği"
                    />

                    <RatingScale
                      value={formData.staffResponseTime}
                      onChange={(value) => handleInputChange('staffResponseTime', value)}
                      label="Personel Yanıt Hızı"
                    />

                    <RatingScale
                      value={formData.conciergeService}
                      onChange={(value) => handleInputChange('conciergeService', value)}
                      label="Concierge Hizmeti"
                    />
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Departman Hizmetleri</h3>
                    
                    <RatingScale
                      value={formData.housekeepingService}
                      onChange={(value) => handleInputChange('housekeepingService', value)}
                      label="Temizlik Hizmeti"
                    />

                    <RatingScale
                      value={formData.maintenanceService}
                      onChange={(value) => handleInputChange('maintenanceService', value)}
                      label="Teknik Servis"
                    />

                    <RatingScale
                      value={formData.securityService}
                      onChange={(value) => handleInputChange('securityService', value)}
                      label="Güvenlik Hizmeti"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Kullandığınız Hizmetler</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'Resepsiyon', 'Concierge', 'Oda Servisi', 'Temizlik Hizmeti',
                      'Teknik Servis', 'Güvenlik', 'Valet Park', 'Bagaj Hizmeti',
                      'Uyandırma Servisi', 'Çamaşırhane', 'Kuru Temizleme', 'Bebek Bakım'
                    ].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.usedServices.includes(service)}
                          onCheckedChange={(checked) => handleServiceChange(service, checked)}
                        />
                        <Label htmlFor={service} className="text-sm">{service}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Yemek & İçecek */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Restoran Hizmetleri</h3>
                    
                    <RatingScale
                      value={formData.restaurantQuality}
                      onChange={(value) => handleInputChange('restaurantQuality', value)}
                      label="Yemek Kalitesi"
                    />

                    <RatingScale
                      value={formData.restaurantService}
                      onChange={(value) => handleInputChange('restaurantService', value)}
                      label="Restoran Hizmeti"
                    />

                    <RatingScale
                      value={formData.restaurantVariety}
                      onChange={(value) => handleInputChange('restaurantVariety', value)}
                      label="Menü Çeşitliliği"
                    />

                    <RatingScale
                      value={formData.breakfastQuality}
                      onChange={(value) => handleInputChange('breakfastQuality', value)}
                      label="Kahvaltı Kalitesi"
                    />
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Diğer F&B Hizmetleri</h3>
                    
                    <RatingScale
                      value={formData.barService}
                      onChange={(value) => handleInputChange('barService', value)}
                      label="Bar Hizmeti"
                    />

                    <RatingScale
                      value={formData.roomServiceQuality}
                      onChange={(value) => handleInputChange('roomServiceQuality', value)}
                      label="Oda Servisi Kalitesi"
                    />

                    <RatingScale
                      value={formData.foodPricing}
                      onChange={(value) => handleInputChange('foodPricing', value)}
                      label="Fiyat-Performans Oranı"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Kullandığınız F&B Hizmetleri</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'Ana Restoran', 'Kahvaltı Salonu', 'Bar', 'Oda Servisi',
                      'Pool Bar', 'Snack Bar', 'Lobby Bar', 'Minibar',
                      'Room Service', 'Banket', 'Özel Yemek', 'Diyet Menü'
                    ].map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={formData.usedServices.includes(service)}
                          onCheckedChange={(checked) => handleServiceChange(service, checked)}
                        />
                        <Label htmlFor={service} className="text-sm">{service}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Genel Değerlendirme */}
            {currentStep === 6 && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Genel Memnuniyet</h3>
                    
                    <RatingScale
                      value={formData.overallSatisfaction}
                      onChange={(value) => handleInputChange('overallSatisfaction', value)}
                      label="Genel Memnuniyet"
                    />

                    <RatingScale
                      value={formData.valueForMoney}
                      onChange={(value) => handleInputChange('valueForMoney', value)}
                      label="Fiyat-Performans"
                    />

                    <RatingScale
                      value={formData.locationRating}
                      onChange={(value) => handleInputChange('locationRating', value)}
                      label="Konum"
                    />

                    <RatingScale
                      value={formData.facilitiesRating}
                      onChange={(value) => handleInputChange('facilitiesRating', value)}
                      label="Otel Olanakları"
                    />
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Tavsiye & Tekrar Gelme</h3>
                    
                    <div>
                      <Label className="text-sm font-medium">Otelimizi tavsiye eder misiniz?</Label>
                      <RadioGroup
                        value={formData.recommend}
                        onValueChange={(value) => handleInputChange('recommend', value)}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="definitely" id="recommend-definitely" />
                          <Label htmlFor="recommend-definitely">Kesinlikle</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="probably" id="recommend-probably" />
                          <Label htmlFor="recommend-probably">Muhtemelen</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="maybe" id="recommend-maybe" />
                          <Label htmlFor="recommend-maybe">Kararsızım</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="recommend-no" />
                          <Label htmlFor="recommend-no">Hayır</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Tekrar gelmeyi düşünür müsünüz?</Label>
                      <RadioGroup
                        value={formData.returnIntent}
                        onValueChange={(value) => handleInputChange('returnIntent', value)}
                        className="flex gap-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="definitely" id="return-definitely" />
                          <Label htmlFor="return-definitely">Kesinlikle</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="probably" id="return-probably" />
                          <Label htmlFor="return-probably">Muhtemelen</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="maybe" id="return-maybe" />
                          <Label htmlFor="return-maybe">Kararsızım</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="return-no" />
                          <Label htmlFor="return-no">Hayır</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Görüş ve Önerileriniz</h3>
                  
                  <div>
                    <Label htmlFor="positiveAspects">En beğendiğiniz yönler</Label>
                    <Textarea
                      id="positiveAspects"
                      value={formData.positiveAspects}
                      onChange={(e) => handleInputChange('positiveAspects', e.target.value)}
                      placeholder="Otelimizde en çok beğendiğiniz özellikleri paylaşın..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="improvementAreas">Geliştirilmesi gereken alanlar</Label>
                    <Textarea
                      id="improvementAreas"
                      value={formData.improvementAreas}
                      onChange={(e) => handleInputChange('improvementAreas', e.target.value)}
                      placeholder="Hangi konularda gelişim görmek istersiniz?"
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalComments">Ek yorumlarınız</Label>
                    <Textarea
                      id="additionalComments"
                      value={formData.additionalComments}
                      onChange={(e) => handleInputChange('additionalComments', e.target.value)}
                      placeholder="Eklemek istediğiniz başka görüşleriniz..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">Özel istekleriniz karşılandı mı?</Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      placeholder="Özel istekleriniz ve bunların karşılanma durumu..."
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t">
              <Button
                onClick={prevStep}
                disabled={currentStep === 1}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Önceki
              </Button>

              {currentStep < surveySteps.length ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center gap-2"
                  disabled={
                    (currentStep === 1 && (!formData.name || !formData.roomNumber)) ||
                    (currentStep === 6 && !formData.overallSatisfaction)
                  }
                >
                  Sonraki
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.overallSatisfaction}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Anketi Tamamla"}
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
