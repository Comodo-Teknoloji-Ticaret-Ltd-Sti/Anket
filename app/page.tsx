"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Hotel, BarChart3 } from 'lucide-react'
import Link from "next/link"

export default function HomePage() {
  const [showQR, setShowQR] = useState(false)

  // QR kod URL'i - gerçek domain'inizle değiştirin
  const surveyUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/survey`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(surveyUrl)}&bgcolor=f0f9ff&color=1e40af&qzone=2`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Hotel className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Otel Müşteri Memnuniyet Sistemi</h1>
          </div>
          <p className="text-gray-600">QR kod ile müşteri anketleri ve sonuç takibi</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Kod Kartı */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Müşteri Anketi QR Kodu
              </CardTitle>
              <CardDescription>
                Bu QR kodu müşterilerinizin görebileceği yerlere yerleştirin
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {!showQR ? (
                <Button onClick={() => setShowQR(true)} className="w-full">
                  QR Kodu Göster
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg inline-block shadow-sm">
                    <img
                      src={qrCodeUrl || "/placeholder.svg"}
                      alt="Anket QR Kodu"
                      className="w-64 h-64 mx-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Müşteriler bu kodu okutarak ankete ulaşabilir
                  </p>
                  <Link href="/survey">
                    <Button variant="outline" className="w-full">
                      Anketi Test Et
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin Paneli Kartı */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Anket Sonuçları
              </CardTitle>
              <CardDescription>
                Müşteri geri bildirimlerini görüntüleyin ve analiz edin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin">
                <Button className="w-full">
                  Sonuçları Görüntüle
                </Button>
              </Link>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• Gerçek zamanlı sonuçlar</p>
                <p>• Detaylı analizler</p>
                <p>• Grafik ve istatistikler</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-blue-900 mb-2">Nasıl Çalışır?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
                <div>
                  <div className="font-medium">1. QR Kod Yerleştirin</div>
                  <div>Resepsiyon, oda, restoran gibi alanlara</div>
                </div>
                <div>
                  <div className="font-medium">2. Müşteriler Anketi Doldurur</div>
                  <div>Kolay ve hızlı anket formu</div>
                </div>
                <div>
                  <div className="font-medium">3. Sonuçları Takip Edin</div>
                  <div>Admin panelinden anlık sonuçlar</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
