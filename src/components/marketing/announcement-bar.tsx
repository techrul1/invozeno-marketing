import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export async function AnnouncementBar() {
  const supabase = await createClient()

  const { data: setting } = await supabase
    .from('cms_settings')
    .select('setting_value')
    .eq('setting_key', 'announcement_bar')
    .single()

  if (!setting || !setting.setting_value?.isActive) return null

  const config = setting.setting_value

  return (
    <div 
      className="w-full px-4 py-2 text-center text-sm font-medium flex items-center justify-center gap-2"
      style={{ backgroundColor: config.bgColor || '#4f46e5', color: config.textColor || '#ffffff' }}
    >
      <span>{config.message}</span>
      {config.link && config.buttonText && (
        <Link 
          href={config.link} 
          className="underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold"
        >
          {config.buttonText}
        </Link>
      )}
    </div>
  )
}
