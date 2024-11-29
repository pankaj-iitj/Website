// components/CurrentMembersInput.tsx
import React, {useEffect, useState} from 'react'
import {useClient} from 'sanity'

export const CurrentMembersInput = ({value, onChange}: any) => {
  const client = useClient()
  const [members, setMembers] = useState<any[]>([])

  useEffect(() => {
    // Fetch members where 'isAlumni' is false
    client
      .fetch(`*[_type == "member" && isAlumni == false]`) // Fetch non-alumni members
      .then((result) => setMembers(result))
  }, [client])

  const handleSelect = (selectedMembers: any[]) => {
    onChange(selectedMembers)
  }

  return (
    <div>
      <label>Select Current Members</label>
      <select
        multiple
        value={value}
        onChange={(e) => handleSelect(Array.from(e.target.selectedOptions))}
      >
        {members.map((member: any) => (
          <option key={member._id} value={member._id}>
            {member.name}
          </option>
        ))}
      </select>
    </div>
  )
}
