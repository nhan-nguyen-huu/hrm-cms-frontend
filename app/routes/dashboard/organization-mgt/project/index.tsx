import { useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ButtonAction from '~/components/actions/button-action'
import { isActiveFilterValue } from '~/components/customs/filter-panel-custom'
import { type TFilterPanelProjectFormSchema, getFilterPanelProjectSchema } from '~/helpers/schema.helper'
import { usePagination } from '~/hooks/use-pagination'
import OrganizationHeaderPage from '~/routes/dashboard/organization-mgt/components/organization-header-page'
import OrganizationTabs from '~/routes/dashboard/organization-mgt/components/organization-tabs'
import ProjectFilterPanel from '~/routes/dashboard/organization-mgt/components/project/project-filter-panel'
import ProjectTable from '~/routes/dashboard/organization-mgt/components/project/project-table'
import { MOCK_PROJECTS } from '~/shared/constants/mock-project.constant'
import { EProjectStatus } from '~/shared/enums/common.enum'
import { EFilterPanelFormKey, EFilterPanelProjectFormKey } from '~/shared/enums/form.enum'
import type { IProject } from '~/shared/models/project.model'

const DEFAULT_VALUES: TFilterPanelProjectFormSchema = {
  [EFilterPanelFormKey.Keyword]: '',
  [EFilterPanelProjectFormKey.Department]: null,
  [EFilterPanelProjectFormKey.Status]: null,
  [EFilterPanelProjectFormKey.Year]: null
}

const getYear = (month: string) => Number(month.split('/')[1])

// Years covered by at least one project, used as options for the period filter
const getYearOptions = (projects: IProject[]) => {
  const years = new Set<number>()
  projects.forEach((project) => {
    for (let year = getYear(project.startMonth); year <= getYear(project.endMonth); year++) years.add(year)
  })
  return [...years].sort().map((year) => ({ label: String(year), value: String(year) }))
}

const ProjectPage = () => {
  const { t } = useTranslation()
  const { paging, setPage, setSize } = usePagination({ isNoSyncParams: true })
  const filterPanelForm = useForm<TFilterPanelProjectFormSchema>({
    resolver: zodResolver(getFilterPanelProjectSchema()),
    defaultValues: DEFAULT_VALUES,
    mode: 'all'
  })
  const filters = useWatch({ control: filterPanelForm.control })

  // TODO: replace MOCK_PROJECTS with the project list API (server-side filter + paging) once available
  const projects = MOCK_PROJECTS
  const yearOptions = useMemo(() => getYearOptions(projects), [projects])

  const filteredProjects = useMemo(() => {
    const keyword = filters.keyword?.trim().toLowerCase() ?? ''
    const { department, status, year } = filters
    return projects.filter((project) => {
      if (
        keyword &&
        ![project.name, project.code, project.projectManager.name, project.projectManager.email]
          .join(' ')
          .toLowerCase()
          .includes(keyword)
      )
        return false
      if (isActiveFilterValue(department) && project.department !== department) return false
      if (isActiveFilterValue(status) && project.status !== status) return false
      if (isActiveFilterValue(year)) {
        const selected = Number(year)
        if (selected < getYear(project.startMonth) || selected > getYear(project.endMonth)) return false
      }
      return true
    })
  }, [projects, filters])

  const totalPage = Math.ceil(filteredProjects.length / paging.size)
  const page = Math.min(paging.page, Math.max(totalPage - 1, 0))
  const pagedProjects = filteredProjects.slice(page * paging.size, (page + 1) * paging.size)

  const countByStatus = (status: EProjectStatus) => projects.filter((project) => project.status === status).length

  return (
    <section className='flex flex-col gap-4'>
      <OrganizationHeaderPage
        description={t('common.projectSummary', {
          total: projects.length,
          inProgress: countByStatus(EProjectStatus.InProgress),
          endingSoon: countByStatus(EProjectStatus.EndingSoon),
          kickoff: countByStatus(EProjectStatus.Kickoff),
          completed: countByStatus(EProjectStatus.Completed)
        })}
      >
        <ButtonAction actionName={t('action.exportList')} actionType='DOWNLOAD' />
        <ButtonAction actionName={t('action.addProject')} actionType='CREATE' />
      </OrganizationHeaderPage>
      <OrganizationTabs />
      <ProjectFilterPanel
        form={filterPanelForm}
        yearOptions={yearOptions}
        shownCount={filteredProjects.length}
        totalCount={projects.length}
      />
      <ProjectTable
        data={pagedProjects}
        page={page}
        totalPage={totalPage}
        onPageChange={setPage}
        pageSize={paging.size}
        onPageSizeChange={setSize}
      />
    </section>
  )
}

export default ProjectPage
