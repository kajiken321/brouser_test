"use client"

import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [url, setUrl] = useState('https://example.com')
  const [content, setContent] = useState<string | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const navigate = async (newUrl: string) => {
    const urlWithProtocol = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`
    setUrl(urlWithProtocol)
    if (iframeRef.current) {
      iframeRef.current.src = urlWithProtocol
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(url)
  }

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = url
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center p-2 bg-gray-100 border-b border-gray-200">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => iframeRef.current?.contentWindow?.history.back()} aria-label="Go back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => iframeRef.current?.contentWindow?.history.forward()} aria-label="Go forward">
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => iframeRef.current?.contentWindow?.location.reload()} aria-label="Refresh">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="flex-grow ml-2">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="w-full h-9 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </form>
      </div>
      <div className="flex-grow overflow-hidden">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-none"
          title="Web Content"
          sandbox="allow-same-origin allow-scripts allow-forms"
        />
      </div>
    </div>
  )
}