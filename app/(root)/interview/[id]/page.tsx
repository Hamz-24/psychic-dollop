import { redirect } from "next/navigation";
import {getInterviewById} from "@/lib/action/general.action";
import Image from "next/image";
import {getRandomInterviewCover} from "@/lib/utils";
import DisplayTechIcons from "@/components/DisplayTechicons";
import {getCurrentUser} from "@/lib/action/auth.action";
import Agent from "@/components/Agent";

const Page = async ({ params }: RouteParams) => {
    const { id } = params;
    const interview = await getInterviewById(id);
    const user = await getCurrentUser();

    if(!interview) redirect('/')

    return (
        <>
            <div className="flex flex-row gap-4 justify-between">
                <div className="flex flex-row gap-4 items-centermax-sm:flex-col">
                    <div className="flex flex-row gap-4items-center">
                        <Image src={getRandomInterviewCover()}
                               alt="cover-image" width={40} height={40} className="rounded-fullobject-cover size-[40px]" />
                        <h3 className="capitalize">{interview.role} Interview</h3>
                    </div>

                    <DisplayTechIcons techStack={interview.techstack} />

                    </div>
                <p className="bg-dark-200 px-4 py-2 rounded-lgh-fit capitalize">{interview.type}</p>
                </div>

            <Agent
                userName={user?.name}
                type={user?.id}
                interviewId={id}
                type="interview"
                questions={interview.questions}/>

        </>
    )
}

export default Page