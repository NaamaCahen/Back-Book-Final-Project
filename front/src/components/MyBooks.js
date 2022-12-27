import React from 'react'
import {Button, Tabs} from 'flowbite-react';

function MyBooks() {
  return (
    <>
      <h1>MyBooks</h1>
      <div className='h-96'>
      <Tabs.Group aria-label="Tabs with underline" style="underline">
        <Tabs.Item title="sharing">
          sharing
        </Tabs.Item>
        <Tabs.Item title="reading">
          reading
        </Tabs.Item>
        <Tabs.Item title="requested">
          requested
        </Tabs.Item>
        <Tabs.Item title="given">
          given
        </Tabs.Item>
      </Tabs.Group>
      </div>
      <Button>add new book</Button>
    </>
  )
}

export default MyBooks
