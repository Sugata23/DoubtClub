"use client";

import React, { useState, useCallback, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "framer-motion";

const StarRating = ({ rating, setRating }) => {
    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Star
                        className={`cursor-pointer transition-all duration-150 ease-in-out ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                        onClick={() => setRating(star)}
                    />
                </motion.div>
            ))}
        </div>
    );
};

const ExpandedProfile = ({ participant, onSave, onClose }) => {
    const [activeTab, setActiveTab] = useState("score");
    const [debateScore, setDebateScore] = useState(participant.debateScore);
    const [platformScore, setPlatformScore] = useState(participant.platformScore);
    const [feedback, setFeedback] = useState(participant.feedback);

    const handleSave = () => {
        if (feedback.split(" ").length > 50) {
            alert("Feedback must not exceed 50 words.");
            return;
        }
        onSave(participant.id, { debateScore, platformScore, feedback });
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 1,
            }}
            className="bg-muted/50 rounded-lg mt-2 overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="p-4"
            >
                <div className="flex mb-4">
                    <Button
                        variant={activeTab === "score" ? "default" : "secondary"}
                        className="flex-1 rounded-r-none"
                        onClick={() => setActiveTab("score")}
                    >
                        Score
                    </Button>
                    <Button
                        variant={activeTab === "feedback" ? "default" : "secondary"}
                        className="flex-1 rounded-l-none"
                        onClick={() => setActiveTab("feedback")}
                    >
                        Feedback
                    </Button>
                </div>
                <AnimatePresence mode="wait">
                    {activeTab === "score" && (
                        <motion.div
                            key="score"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <Label htmlFor="debate-score">Debate Score</Label>
                                <StarRating rating={debateScore} setRating={setDebateScore} />
                            </div>
                            <div>
                                <Label htmlFor="platform-score">Platform Score</Label>
                                <StarRating rating={platformScore} setRating={setPlatformScore} />
                            </div>
                        </motion.div>
                    )}
                    {activeTab === "feedback" && (
                        <motion.div
                            key="feedback"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                            }}
                        >
                            <Label htmlFor="feedback">Feedback (maximum 50 words)</Label>
                            <Textarea
                                id="feedback"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="min-h-[150px] mt-2"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="flex justify-end mt-4 gap-2"
                >
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const ParticipantCard = ({ id, index, participant, moveParticipant, isExpanded, onToggleExpand, onSave }) => {
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
        hover: (item, monitor) => {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            moveParticipant(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    return (
        <motion.div
            layout
            ref={ref}
            style={{ opacity: isDragging ? 0.5 : 1 }}
            className="mb-2"
            initial={{ scale: 1 }}
            animate={{ scale: isDragging ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="flex items-start gap-4 cursor-move hover:bg-muted/90 p-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
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
                <Button variant="ghost" size="sm" onClick={() => onToggleExpand(id)}>
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                </Button>
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <ExpandedProfile
                        participant={participant}
                        onSave={onSave}
                        onClose={() => onToggleExpand(id)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const TeamList = ({ team, teamKey, moveParticipant, expandedParticipant, onToggleExpand, onSave }) => {
    return (
        //shadow-lg
        <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-primary">
                {teamKey === "team1" ? "Team 1" : "Team 2"}
            </h2>
            <motion.div layout>
                {team.map((participant, index) => (
                    <ParticipantCard
                        key={participant.id}
                        id={participant.id}
                        index={index}
                        participant={participant}
                        moveParticipant={(dragIndex, hoverIndex) =>
                            moveParticipant(teamKey, dragIndex, hoverIndex)
                        }
                        isExpanded={expandedParticipant === participant.id}
                        onToggleExpand={onToggleExpand}
                        onSave={onSave}
                    />
                ))}
            </motion.div>
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
    const [expandedParticipant, setExpandedParticipant] = useState(null);

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

    const handleToggleExpand = (participantId) => {
        setExpandedParticipant((prev) => (prev === participantId ? null : participantId));
    };

    const handleSave = (participantId, newData) => {
        setTeams((prevTeams) => {
            const updatedTeams = { ...prevTeams };
            for (const teamKey in updatedTeams) {
                updatedTeams[teamKey] = updatedTeams[teamKey].map((p) =>
                    p.id === participantId ? { ...p, ...newData } : p
                );
            }
            return updatedTeams;
        });
    };


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-2 gap-8 p-8">
                <TeamList
                    team={teams.team1}
                    teamKey="team1"
                    moveParticipant={moveParticipant}
                    expandedParticipant={expandedParticipant}
                    onToggleExpand={handleToggleExpand}
                    onSave={handleSave}
                />
                <TeamList
                    team={teams.team2}
                    teamKey="team2"
                    moveParticipant={moveParticipant}
                    expandedParticipant={expandedParticipant}
                    onToggleExpand={handleToggleExpand}
                    onSave={handleSave}
                />
            </div>
        </DndProvider>
    );
}