"use client"

import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

const StarRating = ({ rating, setRating }) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`cursor-pointer ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                    onClick={() => setRating(star)}
                />
            ))}
        </div>
    )
}

export default function page() {
    const [participants, setParticipants] = useState([
        {
            id: 1,
            name: "Olivia Johnson",
            image: "/placeholder-user.jpg",
            debateScore: 4,
            platformScore: 3,
            feedback:
                "Olivia presented her arguments clearly and confidently. She could improve her use of visual aids to better support her points.",
        },
        {
            id: 2,
            name: "Liam Davis",
            image: "/placeholder-user.jpg",
            debateScore: 3,
            platformScore: 4,
            feedback:
                "Liam's platform was well-researched and he spoke passionately about the issues. He could work on maintaining better eye contact with the audience.",
        },
        {
            id: 3,
            name: "Emma Wilson",
            image: "/placeholder-user.jpg",
            debateScore: 5,
            platformScore: 4,
            feedback:
                "Emma's debate skills were exceptional. She anticipated counterarguments and responded thoughtfully. Her platform was also very compelling.",
        },
        {
            id: 4,
            name: "Noah Anderson",
            image: "/placeholder-user.jpg",
            debateScore: 3,
            platformScore: 2,
            feedback:
                "Noah's delivery could use some improvement. His platform lacked depth and failed to address key issues. He should spend more time preparing.",
        },
        {
            id: 5,
            name: "Gini Anderson",
            image: "/placeholder-user.jpg",
            debateScore: 3,
            platformScore: 2,
            feedback:
                "Gini's delivery could use some improvement. His platform lacked depth and failed to address key issues. He should spend more time preparing.",
        },
        {
            id: 6,
            name: "Frank Anderson",
            image: "/placeholder-user.jpg",
            debateScore: 3,
            platformScore: 2,
            feedback:
                "Frank's delivery could use some improvement. His platform lacked depth and failed to address key issues. He should spend more time preparing.",
        },
    ])
    const [selectedParticipant, setSelectedParticipant] = useState(null)
    const [debateScore, setDebateScore] = useState(0)
    const [platformScore, setPlatformScore] = useState(0)
    const [feedback, setFeedback] = useState("")
    const handleParticipantClick = (participant) => {
        setSelectedParticipant(participant)
        setDebateScore(participant.debateScore)
        setPlatformScore(participant.platformScore)
        setFeedback(participant.feedback)
    }
    const handleSaveScores = () => {
        const updatedParticipants = participants.map((p) =>
            p.id === selectedParticipant.id
                ? {
                    ...p,
                    debateScore,
                    platformScore,
                    feedback,
                }
                : p,
        )
        setParticipants(updatedParticipants)
        setSelectedParticipant(null)
    }
    const renderParticipant = (participant) => (
        <div
            key={participant.id}
            className="flex items-start gap-4 cursor-pointer hover:bg-muted/50 p-4 rounded-lg transition-colors duration-300"
            onClick={() => handleParticipantClick(participant)}
        >
            <Avatar className="w-12 h-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <h3 className="font-medium">{participant.name}</h3>
                {participant.debateScore !== 0 && participant.platformScore !== 0 && (
                    <div className="mt-2 space-y-2">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Debate Score:</p>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= participant.debateScore ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Platform Score:</p>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= participant.platformScore ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {participant.feedback && (
                    <div className="mt-2">
                        <p className="text-sm font-medium text-muted-foreground">Feedback:</p>
                        <p className="text-sm text-muted-foreground">{participant.feedback}</p>
                    </div>
                )}
            </div>
        </div>
    )

    return (
        <div className="grid grid-cols-2 gap-8 p-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Team A</h2>
                <div className="space-y-4">
                    {participants
                        .filter((p, i) => i % 2 === 0)
                        .map(renderParticipant)}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">Team B</h2>
                <div className="space-y-4">
                    {participants
                        .filter((p, i) => i % 2 !== 0)
                        .map(renderParticipant)}
                </div>
            </div>
            {selectedParticipant && (
                <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50 animate-fade-in">
                    <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Scores and Feedback for {selectedParticipant.name}</h2>
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="debate-score">Debate Score</Label>
                                <StarRating rating={debateScore} setRating={setDebateScore} />
                            </div>
                            <div>
                                <Label htmlFor="platform-score">Platform Score</Label>
                                <StarRating rating={platformScore} setRating={setPlatformScore} />
                            </div>
                            <div>
                                <Label htmlFor="feedback">Feedback</Label>
                                <Textarea
                                    id="feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    minLength={50}
                                    className="min-h-[150px]"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4 gap-2">
                            <Button variant="ghost" onClick={() => setSelectedParticipant(null)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSaveScores}>Save</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}