import { useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ButtonAction from '~/components/actions/button-action'
import FilterPanel from '~/components/common/filter-panel'
import { isActiveFilterValue } from '~/components/customs/filter-panel-custom'
import { dateHelper } from '~/helpers/date.helper'
import { type TFilterPanelProjectFormSchema, getFilterPanelProjectSchema } from '~/helpers/schema.helper'
import { usePagination } from '~/hooks/use-pagination'
import OrganizationHeaderPage from '~/routes/dashboard/organization-mgt/components/organization-header-page'
import OrganizationTabs from '~/routes/dashboard/organization-mgt/components/organization-tabs'
import ProjectTable from '~/routes/dashboard/organization-mgt/components/project/project-table'
import { DATA } from '~/shared/constants/data.constant'
import { MOCK_PROJECTS } from '~/shared/constants/mock-project.constant'
import { EProjectStatus } from '~/shared/enums/common.enum'
import { EFilterPanelFormKey, EFilterPanelProjectFormKey } from '~/shared/enums/form.enum'

const DEFAULT_VALUES: TFilterPanelProjectFormSchema = {
  [EFilterPanelFormKey.Keyword]: '',
  [EFilterPanelProjectFormKey.Department]: null,
  [EFilterPanelProjectFormKey.Status]: null,
  [EFilterPanelProjectFormKey.Year]: null
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
  const yearOptions = useMemo(() => dateHelper.getYearOptionsFromMonthRanges(projects), [projects])

  const filteredProjects = useMemo(() => {
    const keyword = filters.keyword?.trim().toLowerCase() ?? ''
    const { department, status, year } = filters
    return projects.filter((project) => {
      if (
        keyword &&
        ![project.name, project.code, project.projectManager?.name, project.projectManager?.email]
          .join(' ')
          .toLowerCase()
          .includes(keyword)
      )
        return false
      if (isActiveFilterValue(department) && project.department !== department) return false
      if (isActiveFilterValue(status) && project.status !== status) return false
      if (
        isActiveFilterValue(year) &&
        !dateHelper.isYearInMonthRange(Number(year), project.startMonth, project.endMonth)
      )
        return false
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
      <section className='flex flex-col gap-2'>
        <FilterPanel
          form={filterPanelForm}
          fields={[
            {
              type: 'INPUT_GROUP',
              name: EFilterPanelFormKey.Keyword,
              placeholder: t('inputPlaceholder.searchProject'),
              className: 'max-w-100'
            },
            {
              type: 'SELECT',
              name: EFilterPanelProjectFormKey.Department,
              placeholder: t('inputPlaceholder.departmentAll'),
              options: DATA.GET_OPTIONS_DEPARTMENT(t),
              hasAllOption: true,
              className: 'w-48'
            },
            {
              type: 'SELECT',
              name: EFilterPanelProjectFormKey.Status,
              placeholder: t('inputLabel.status'),
              options: DATA.GET_OPTIONS_PROJECT_STATUS(t),
              hasAllOption: true,
              className: 'w-auto'
            },
            {
              type: 'SELECT',
              name: EFilterPanelProjectFormKey.Year,
              placeholder: t('inputLabel.period'),
              options: yearOptions,
              hasAllOption: true,
              className: 'w-auto'
            }
          ]}
        />
      </section>
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
