
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type Props = {
  onFileSelect: (file: File | null) => void
}

export function InputFile({ onFileSelect }: Props) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file))
      onFileSelect(file)
    } else {
      setPreview(null)
      onFileSelect(null)
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="picture">Picture (JPEG, PNG, GIF, WebP)</Label>
      <Input id="picture" type="file" accept="image/jpeg,image/jpg,image/png,image/gif,image/webp" onChange={handleFileChange} />
      {preview && (
        <div className="mt-2 w-40 h-40 rounded-md border border-gray-300 overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  )
}
