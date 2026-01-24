import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Lesson = {
  id: string;
  title: string;
  description?: string;
  step_order: number;
  estimated_time?: number;
  topics?: string[];
  completed?: boolean;
  hasResources?: boolean;
};

export function useCourseData(slug: string) {
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const cached = localStorage.getItem(`course_${slug}`);
    if (cached) {
      try {
        setCourse(JSON.parse(cached));
      } catch {
        console.warn("Failed to parse cached course data");
      }
    }

    const fetchCourse = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("courses")
        .select("*, lessons(*)")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        const normalizedCourse = {
          ...data,
          lessons: ((data.lessons || []) as Lesson[]).sort((a, b) => a.step_order - b.step_order),
        };
        setCourse(normalizedCourse);
        localStorage.setItem(`course_${slug}`, JSON.stringify(normalizedCourse));
      }

      setLoading(false);
    };

    fetchCourse();
  }, [slug]);

  return { course, loading };
}
