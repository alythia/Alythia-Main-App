import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADDED_NEW_PROJECT = 'ADDED_NEW_PROJECT'
const FETCHED_DEVELOPER_PROJECTS = 'FETCHED_USER_PROJECTS'

/**
 * INITIAL STATE
 */
const initialState = {
  userProjects: []
}

/**
 * ACTION CREATORS
 */
const addedNewProject = project => ({type: ADDED_NEW_PROJECT, project})
const fetchedUserProjects = projects => ({
  type: FETCHED_DEVELOPER_PROJECTS,
  projects
})

/**
 * THUNK CREATORS
 */
export const addNewProject = project => async dispatch => {
  const {data} = await axios.post('/api/clients/new-project', project)
  dispatch(addedNewProject(data))
}

export const fetchUserProjects = developerId => async dispatch => {
  const {data} = await axios.get(`/api/developers/${developerId}/projects`)
  dispatch(fetchedUserProjects(data))
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADDED_NEW_PROJECT: {
      return {
        ...state,
        projects: [...state.projects, action.project]
      }
    }
    case FETCHED_DEVELOPER_PROJECTS: {
      return {
        ...state
      }
    }
    default: {
      return {...state}
    }
  }
}
