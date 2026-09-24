import { useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ButtonAction from '~/components/actions/button-action'
import FilterPanel from '~/components/common/filter-panel'
import HeaderPage from '~/components/common/header-page'
import TableCustom from '~/components/customs/table-custom'
import { projectColumn } from '~/helpers/columns/project-column'
import { type TFilterPanelProjectFormSchema, getFilterPanelProjectSchema } from '~/helpers/schema.helper'
import { usePagination } from '~/hooks/use-pagination'
import OrganizationTabs from '~/routes/dashboard/organization-mgt/components/organization-tabs'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import { MOCK_PROJECTS } from '~/shared/constants/mock-project.constant'
import { EProjectStatus } from '~/shared/enums/common.enum'
import { EFilterPanelFormKey, EFilterPanelProjectFormKey } from '~/shared/enums/form.enum'

const DEFAULT_VALUES: TFilterPanelProjectFormSchema = {
  [EFilterPanelFormKey.Keyword]: '',
  [EFilterPanelProjectFormKey.Department]: null,
  [EFilterPanelProjectFormKey.Status]: null,
  [EFilterPanelProjectFormKey.Year]: null
}

const getYear = (month: string) => Number(month.split('/')[1])

const isActiveFilter = (value?: string | null) => !!value && value !== COMMON_CONSTANT.FILTER_ALL

const ProjectPage = () => {
  const { t } = useTranslation()
  const columns = projectColumn.getList(t)
  const { paging, setPage, setSize } = usePagination({ isNoSyncParams: true })
  const filterPanelForm = useForm<TFilterPanelProjectFormSchema>({
    resolver: zodResolver(getFilterPanelProjectSchema()),
    defaultValues: DEFAULT_VALUES,
    mode: 'all'
  })
  const filters = useWatch({ control: filterPanelForm.control })

  // TODO: replace MOCK_PROJECTS with the project list API (server-side filter + paging) once available
  const projects = MOCK_PROJECTS

  const filteredProjects = useMemo(() => {
    const keyword = filters.keyword?.trim().toLowerCase() ?? ''
    const { department, status, year } = filters
    return projects.filter((project) => {
      if (keyword && ![project.name, project.code, project.projectManager].join(' ').toLowerCase().includes(keyword))
        return false
      if (isActiveFilter(department) && project.department !== department) return false
      if (isActiveFilter(status) && project.status !== status) return false
      if (isActiveFilter(year)) {
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
      <HeaderPage
        title={t('sidebarMenu.organizationMgt.base')}
        description={t('common.projectSummary', {
          total: projects.length,
          inProgress: countByStatus(EProjectStatus.InProgress),
          endingSoon: countByStatus(EProjectStatus.EndingSoon),
          kickoff: countByStatus(EProjectStatus.Kickoff),
          completed: countByStatus(EProjectStatus.Completed)
        })}
      >
        <section className='flex items-center justify-end gap-3 flex-wrap'>
          <ButtonAction actionName={t('action.exportList')} actionType='DOWNLOAD' />
          <ButtonAction actionName={t('action.addProject')} actionType='CREATE' />
        </section>
      </HeaderPage>
      <OrganizationTabs />
      <FilterPanel form={filterPanelForm} placeholderKeyword={t('inputPlaceholder.searchProject')} />
      <TableCustom
        columns={columns}
        data={pagedProjects}
        emptyText={t('empty.noData')}
        getRowId={(row) => row.id}
        page={page}
        totalPage={totalPage}
        onPageChange={setPage}
        pageSize={paging.size}
        onPageSizeChange={setSize}
        disableNavigationAll
      />
    </section>
  )
}

export default ProjectPage
