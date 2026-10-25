import React, { useState } from "react";
import { Bookmark, FolderOpen } from "lucide-react";
import ClueCard from "./ClueCard";
import SuspectRoster from "./SuspectRoster";
import { formatDisplayName } from "../stage/Avatar";

export default function EvidenceDocket({
  clues = [],
  suspects = [],
  selectedSuspectId,
  onSelectSuspect,
  suspectMoods = {}
}) {
  const [filterId, setFilterId] = useState("all");

  const filteredClues = filterId === "all" ? clues : clues.filter(c => c.suspectId === filterId);

  return (
    <aside className="evidence-docket-panel">
      {/* Docket Header */}
      <div className="docket-top-bar">
        <div className="docket-title-wrap">
          <Bookmark size={16} className="docket-bookmark-icon" />
          <h2 className="docket-heading">CASE EVIDENCE DOCKET</h2>
        </div>
        <div className="docket-clue-counter">
          {clues.length} / 8 clues
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="docket-filter-tabs">
        <button
          className={`docket-tab-btn ${filterId === "all" ? "active" : ""}`}
          onClick={() => setFilterId("all")}
        >
          All Clues
        </button>
        {suspects.map(s => (
          <button
            key={s.id}
            className={`docket-tab-btn ${filterId === s.id ? "active" : ""}`}
            onClick={() => setFilterId(s.id)}
          >
            {formatDisplayName(s.name)}
          </button>
        ))}
      </div>

      {/* Clues Card Stream */}
      <div className="docket-cards-scroll">
        {filteredClues.length === 0 ? (
          <div className="docket-empty-state">
            <FolderOpen size={48} className="empty-folder-icon" />
            <p className="empty-primary-text">No testimony recorded yet.</p>
            <p className="empty-sub-text">Select a suspect in the lineup and ask questions to gather evidence.</p>
          </div>
        ) : (
          filteredClues.map(c => <ClueCard key={c.id} clue={c} />)
        )}
      </div>

      {/* Suspect Roster at Bottom */}
      <SuspectRoster
        suspects={suspects}
        selectedSuspectId={selectedSuspectId}
        onSelectSuspect={onSelectSuspect}
        suspectMoods={suspectMoods}
      />
    </aside>
  );
}
