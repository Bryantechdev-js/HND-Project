"use client"

// useSharedState.js
import { useState } from 'react';

const share = () => {
    const [EmailFo, setEmailFo]=useState(false)
    const [Inbox, setInbox]=useState(false)
    const [Sendbox, setSendbox]=useState(false)

  return {EmailFo,setEmailFo}
};

export default share;
