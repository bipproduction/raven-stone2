import { describe, expect, it } from "vitest"
import manifest from "./manifest"

describe("manifest", () => {
    it("nama app konsisten dengan title di layout", () => {
        const result = manifest()
        expect(result.name).toBe("Raven Stone")
        expect(result.short_name).toBe("Raven Stone")
    })

    it("display standalone supaya installable sebagai app", () => {
        const result = manifest()
        expect(result.display).toBe("standalone")
    })

    it("berisi icon 192x192 dan 512x512 yang mengarah ke public/", () => {
        const result = manifest()
        const sizes = result.icons?.map((icon) => icon.sizes)
        expect(sizes).toContain("192x192")
        expect(sizes).toContain("512x512")
        result.icons?.forEach((icon) => {
            expect(icon.src.startsWith("/icon-")).toBe(true)
            expect(icon.type).toBe("image/png")
        })
    })

    it("start_url mengarah ke root", () => {
        const result = manifest()
        expect(result.start_url).toBe("/")
    })
})
