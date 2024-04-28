import React from 'react'
import { Network, Node, Edge, Options } from 'vis-network'
import { useEffect } from 'react'
import { useUserContext } from '@/components/UserContext.tsx'
import { useQuery } from '@apollo/client'
import { ALL_EVENTS_WITH_TYPES_BY_USER_ID_QUERY } from '@/graphql/queries/all-events-with-types-by-user-id'
import { ALL_CAUSALITIES_BY_EVENT_IDS_QUERY } from '@/graphql/queries/all-causalities-by-event-ids'
import { FetchResolvedWithError } from '@/components/FetchResolvedWithError'

export const eventTypeColors: { [key: number]: string } = {
  4: 'rgba(153, 27, 30, 1)',
  9: 'rgba(215, 92, 55, 1)',
  11: 'rgba(255, 186, 8, 1)',
  5: 'rgba(192, 128, 24, 1)',
  7: 'rgba(161, 213, 26, 1)',
  6: 'rgba(22, 111, 74, 1)',
  8: 'rgba(4, 120, 87, 1)',
  3: 'rgba(20, 123, 138, 1)',
  10: 'rgba(23, 120, 127, 1)',
  2: 'rgba(53, 135, 202, 1)',
  1: 'rgba(81, 85, 184, 1)',
  12: 'rgba(108, 71, 178, 1)'
}

const options: Options = {
  layout: { randomSeed: '0.5583920310513402:1713712438794' }
}

export const MyCausalityGraphGraph = () => {
  const { user } = useUserContext()
  const graphContainerRef = React.useRef<HTMLDivElement | null>(null)
  const [dataLoaded, setDataLoaded] = React.useState<boolean>(false)

  const {
    data: eventData,
    loading: eventLoading,
    error: eventError
  } = useQuery(ALL_EVENTS_WITH_TYPES_BY_USER_ID_QUERY, {
    variables: { userId: user!.user_id }
  })

  const eventIds = eventData?.getAllEventsWithTypeByUserId
    ? eventData?.getAllEventsWithTypeByUserId.map((event) => {
        return event!.event_id.event_id
      })
    : []
  const {
    data: causalityData,
    loading: causalitiesLoading,
    error: causalitiesError
  } = useQuery(ALL_CAUSALITIES_BY_EVENT_IDS_QUERY, {
    variables: {
      eventIds: eventIds
    }
  })

  let nodes: Array<Node> = []

  // Fill nodes
  if (!eventLoading) {
    eventData?.getAllEventsWithTypeByUserId.forEach((event) => {
      if (event) {
        nodes.push({
          id: event.event_id.event_id,
          label: event.event_id.label + '  ' + event.event_id.event_id,
          color: {
            border: eventTypeColors[event.event_type_id.event_type_id],
            background: 'white'
          },
          borderWidth: 3,
          shape: 'box',
          margin: { top: 5, bottom: 3, left: 5, right: 5 },
          fixed: { x: false, y: false }

          //title: event.event_id.description
        })
      }
    })
  }

  let edges: Array<Edge> = []
  // Fill edges
  if (!causalitiesLoading) {
    causalityData?.getAllCausalitiesByEventIds.forEach((causality) => {
      if (causality) {
        if (causality.succedent) {
          edges.push({
            from: causality.event_id.event_id,
            to: causality.succedent,
            label: causality.causality_type_id.name,
            arrows: 'to',
            length: 250
          })
        } else if (causality.antecedent) {
          edges.push({
            from: causality.event_id.event_id,
            to: causality.antecedent,
            label: causality.causality_type_id.name,
            arrows: 'from',
            length: 250
          })
        }
      }
    })
  }

  // Check if data loading has completed
  useEffect(() => {
    if (!eventLoading && eventData && !causalitiesLoading && causalityData) {
      setDataLoaded(true)
    }
  }, [eventLoading, eventData, causalitiesLoading, causalityData])
  // Execute the effect only once when data has finished loading
  useEffect(() => {
    if (dataLoaded) {
      const graph = new Network(graphContainerRef.current!, {}, options)
      graph.setData({ nodes: nodes, edges: edges })

      // Can be deleted if title is changed
      let defaultNodes = nodes.slice()

      graph.on('click', function (params) {
        const index = nodes.findIndex((event) => event.id === params.nodes[0])

        if (index !== -1) {
          let newNode = { ...nodes[index], label: 'ieiqneiwq' }
          nodes[index] = newNode
          graph.setData({ nodes: nodes, edges: edges })
          nodes = defaultNodes.slice()
        } else {
          graph.setData({ nodes: defaultNodes, edges: edges })
        }
      })
    }
  }, [dataLoaded])

  if (eventLoading || causalitiesLoading) {
    return <div className={'h-full rounded border border-gray-200 bg-gray-100'} />
  }

  if (eventError || causalitiesError) {
    return <FetchResolvedWithError />
  }

  return (
    <div
      className={'h-full rounded border border-gray-200 bg-gray-50'}
      ref={graphContainerRef}
    ></div>
  )
}
