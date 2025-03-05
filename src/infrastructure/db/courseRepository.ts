import { PrismaClient, type course, type module,  type videos } from "@prisma/client";

const prisma = new PrismaClient();

export class CourseRepository {
    async getCourseModulesById(courseId: number): Promise<module[] | null> {
        return await prisma.module.findMany({
            where: { courseId },
            include: { videos: true , course: true}
        });
    }

    async getModuleVideos(moduleId: number): Promise<videos[] | null> {
        return await prisma.videos.findMany({ where: { moduleId } });
    }

    async getCourseById(courseId: number): Promise<course | null> {
        return await prisma.course.findUnique({
            where: { id: courseId },
            include: { module: { include: { videos: true } } }
        });
    }

    async createCourse(name: string, description: string, userId: number, modules: ModuleInput[]): Promise<number | null> {
        const course = await prisma.course.create({
            data: {
                name,
                description,
                userId,
                module: {
                    create: modules.map(mod => ({
                        moduleTitle: mod.moduleTitle,
                        videos: {
                            create: mod.videos.map(video => ({
                                videoTitle: video.videoTitle,
                                videoUrl: video.videoUrl
                            }))
                        }
                    }))
                }
            },
            include: { module: { include: { videos: true } } }
        });
        return course.id;
    }

    async getAllCourses(): Promise<course[] | null> {
        return await prisma.course.findMany({ include: { module: { include: { videos: true } } } });
    }

    async foundCourse(query: Query): Promise<course | null> {
        return await prisma.course.findFirst({
            where: {
                AND: [
                    query.coursetitle ? { name: { contains: query.coursetitle} } : {},
                    query.moduletitle ? {
                        module: {
                            some: { moduleTitle: { contains: query.moduletitle } }
                        }
                    } : {}
                ]
            },
            include: { module: { include: { videos: true } } }
        });
    }

    async deleteCourse(courseId: number): Promise<boolean> {
        await prisma.course.delete({ where: { id: courseId } });
        return true;
    }

    async updateCourse(courseId: number, data: Partial<course>): Promise<course | null> {
        return await prisma.course.update({ where: { id: courseId }, data });
    }

    async searchCourses(searchTerm: string): Promise<course[] | null> {
        return await prisma.course.findMany({
            where: {
                OR: [
                    { name: { contains: searchTerm } },
                    { description: { contains: searchTerm,  } },
                    { module: { some: { moduleTitle: { contains: searchTerm } } } }
                ]
            },
            include: { module: { include: { videos: true } } }
        });
    }
}

// Entity Interfaces
interface Query {
    coursetitle?: string;
    moduletitle?: string;
}

interface ModuleInput {
    moduleTitle: string;
    videos: VideoInput[];
}

interface VideoInput {
    videoTitle: string;
    videoUrl: string;
}
