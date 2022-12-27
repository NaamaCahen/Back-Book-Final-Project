import React from 'react'
import {Button, Tabs} from 'flowbite-react';

function MyBooks() {
  return (
    <>
      <h1>MyBooks</h1>
      <Tabs.Group aria-label="Tabs with underline" style="underline">
        <Tabs.Item title="sharing">
          sharing
        </Tabs.Item>
        <Tabs.Item title="reading">
          reading
        </Tabs.Item>
      </Tabs.Group>
      <Button>add new book</Button>
    </>
  )
}

export default MyBooks
