import { useId } from "react"

import { Label } from "website/src/components/ui/label"
import { SelectNative } from "website/src/components/ui/select-native"

export default function Component() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Simple select (native)</Label>
      <SelectNative id={id}>
        <option value="1">React</option>
        <option value="2">Next.js</option>
        <option value="3">Astro</option>
        <option value="4">Gatsby</option>
      </SelectNative>
    </div>
  )
}
