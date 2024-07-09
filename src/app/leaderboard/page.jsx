"use client";

import React, { useState, useCallback, useRef, useMemo } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const StarRating = ({ rating, setRating }) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`cursor-pointer transition-all duration-150 ease-in-out ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                    onClick={() => setRating(star)}
                />
            ))}
        </div>
    );
};

const ParticipantCard = ({ id, index, participant, moveParticipant, handleParticipantClick }) => {
    const ref = useRef(null);
    const [{ isDragging }, drag] = useDrag({
        type: "participant",
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "participant",
        hover: (item) => {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            moveParticipant(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    const opacity = isDragging ? 0.5 : 1;

    return (
        <div
            ref={ref}
            style={{ opacity }}
            className="flex items-start gap-4 cursor-pointer hover:bg-muted/90 p-4 rounded-lg transition-opacity duration-300 mb-2"
            onClick={() => handleParticipantClick(participant)}
        >
            <div className="font-bold mr-2">{index + 1}</div>
            <Avatar className="w-12 h-12">
                <AvatarImage src={participant.image} />
                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <h3 className="font-medium">{participant.name}</h3>
                {participant.debateScore !== 0 && participant.platformScore !== 0 && (
                    <div className="mt-2 space-y-2">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Debate Score: {participant.debateScore}
                            </p>
                            <p className="text-sm font-medium text-muted-foreground">
                                Platform Score: {participant.platformScore}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const TeamList = ({ team, teamKey, moveParticipant, handleParticipantClick }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">
                {teamKey === "team1" ? "Team 1" : "Team 2"}
            </h2>
            {team.map((participant, index) => (
                <ParticipantCard
                    key={participant.id}
                    id={participant.id}
                    index={index}
                    participant={participant}
                    moveParticipant={(dragIndex, hoverIndex) =>
                        moveParticipant(teamKey, dragIndex, hoverIndex)
                    }
                    handleParticipantClick={handleParticipantClick}
                />
            ))}
        </div>
    );
};

export default function ScoringBoard() {
    const [teams, setTeams] = useState({
        team1: [
            {
                id: "1",
                name: "Olivia Johnson",
                image: "/placeholder-user.jpg",
                debateScore: 0,
                platformScore: 0,
                feedback: "",
            },
            {
                id: "2",
                name: "Liam Davis",
                image: "/placeholder-user.jpg",
                debateScore: 0,
                platformScore: 0,
                feedback: "",
            },
            {
                id: "3",
                name: "Emma Wilson",
                image: "/placeholder-user.jpg",
                debateScore: 0,
                platformScore: 0,
                feedback: "",
            },
        ],
        team2: [
            {
                id: "4",
                name: "Noah Anderson",
                image: "/placeholder-user.jpg",
                debateScore: 0,
                platformScore: 0,
                feedback: "",
            },
            {
                id: "5",
                name: "Gini Anderson",
                image: "/placeholder-user.jpg",
                debateScore: 0,
                platformScore: 0,
                feedback: "",
            },
            {
                id: "6",
                name: "Frank Anderson",
                image: "/placeholder-user.jpg",
                debateScore: 0,
                platformScore: 0,
                feedback: "",
            },
        ],
    });
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [debateScore, setDebateScore] = useState(0);
    const [platformScore, setPlatformScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState("");

    const moveParticipant = useCallback((teamKey, dragIndex, hoverIndex) => {
        setTeams((prevTeams) => {
            const newTeam = [...prevTeams[teamKey]];
            const [removed] = newTeam.splice(dragIndex, 1);
            newTeam.splice(hoverIndex, 0, removed);
            return {
                ...prevTeams,
                [teamKey]: newTeam,
            };
        });
    }, []);

    const handleParticipantClick = (participant) => {
        setSelectedParticipant(participant);
        setDebateScore(participant.debateScore);
        setPlatformScore(participant.platformScore);
        setFeedback(participant.feedback);
        setError("");
    };

    const handleSaveScores = () => {
        if (feedback.split(" ").length > 50) {
            setError("Feedback must not exceed 50 words.");
            return;
        }

        setTeams((prevTeams) => {
            const updatedTeams = { ...prevTeams };
            for (const teamKey in updatedTeams) {
                updatedTeams[teamKey] = updatedTeams[teamKey].map((p) =>
                    p.id === selectedParticipant.id
                        ? { ...p, debateScore, platformScore, feedback }
                        : p
                );
            }
            return updatedTeams;
        });
        setSelectedParticipant(null);
        setError("");
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-2 gap-8 p-8">
                <TeamList
                    team={teams.team1}
                    teamKey="team1"
                    moveParticipant={moveParticipant}
                    handleParticipantClick={handleParticipantClick}
                />
                <TeamList
                    team={teams.team2}
                    teamKey="team2"
                    moveParticipant={moveParticipant}
                    handleParticipantClick={handleParticipantClick}
                />
                {selectedParticipant && (
                    <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50 animate-fade-in">
                        <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4">
                                Scores and Feedback for {selectedParticipant.name}
                            </h2>
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
                                    <Label htmlFor="feedback">Feedback (maximum 50 words)</Label>
                                    <Textarea
                                        id="feedback"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        className="min-h-[150px]"
                                    />
                                </div>
                            </div>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
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
        </DndProvider>
    );
}
