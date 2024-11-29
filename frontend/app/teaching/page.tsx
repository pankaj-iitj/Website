"use client"
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import client from "@/lib/sanity-client";

// Types
interface LTP {
  lecture: number;
  tutorial: number;
  practical: number;
}

interface Course {
  name: string;
  code: string;
  ltp: LTP;
  sessions: string;
}

interface CourseCategory {
  categoryName: string;
  order: number;
  courses: Course[];
}

interface CoursesTableProps {
  title: string;
  courses: Course[];
}

function addSpaceBeforeUppercase(str: string): string {
  return str.replace(/([A-Z])/g, " $1").trim();
}

const CoursesTable = ({ title, courses }: CoursesTableProps) => (
  <Card className="3xl:w-1/2 w-full border-none shadow-none lg:max-w-[980px]">
    <CardHeader>
      <CardTitle className="text-2xl text-blue-700">
        {addSpaceBeforeUppercase(title)}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-600 hover:bg-blue-800">
            <TableHead className="text-white">Course</TableHead>
            <TableHead className="text-white">Code</TableHead>
            <TableHead className="text-white">L-T-P</TableHead>
            <TableHead className="text-white">Session(s)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={index} className="odd:bg-white even:bg-blue-50">
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.code}</TableCell>
              <TableCell>
                {`${course.ltp.lecture}-${course.ltp.tutorial}-${course.ltp.practical}`}
              </TableCell>
              <TableCell>{course.sessions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default function CoursesPage() {
  const [categories, setCategories] = useState<CourseCategory[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const query = `*[_type == "courseCategory"] | order(order asc) {
          categoryName,
          order,
          courses[] {
            name,
            code,
            ltp {
              lecture,
              tutorial,
              practical
            },
            sessions
          }
        }`;

        const coursesData = await client.fetch<CourseCategory[]>(query);
        setCategories(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="min-h-[90vh] p-8">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap justify-center gap-8">
          {categories.map((category) => (
            <CoursesTable
              key={category.categoryName}
              title={category.categoryName}
              courses={category.courses}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
