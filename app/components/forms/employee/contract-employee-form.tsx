import { useEffect } from 'react'

import { type UseFormReturn, useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DangerIcon, InfoCircleIcon } from '~/assets/svgs'
import ButtonAction from '~/components/actions/button-action'
import CardCustom from '~/components/customs/card-custom'
import FormDateTimePickerField from '~/components/forms/form-date-time-picker-field'
import FormField from '~/components/forms/form-field'
import FormSelectField from '~/components/forms/form-select-field'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/components/ui/input-group'
import { formatHelper } from '~/helpers'
import type { TContractEmployeeSchema } from '~/helpers/schemas/employee-schema.helper'
import { DATA } from '~/shared/constants/data.constant'
import { EContractEmployeeFormKey } from '~/shared/enums/form.enum'

interface IContractEmployeeFormProps {
  form: UseFormReturn<TContractEmployeeSchema>
}

const ContractEmployeeForm = ({ form }: IContractEmployeeFormProps) => {
  const { t } = useTranslation()
  const contractTypeOptions = DATA.GET_OPTIONS_CONTRACT_TYPE(t)
  const probationSalaryRateValue = form.watch(EContractEmployeeFormKey.ProbationSalaryRate)
  const baseSalaryValue = form.watch(EContractEmployeeFormKey.BaseSalary)
  const allowancesValue = form.watch(EContractEmployeeFormKey.Allowances)

  const {
    fields: allowanceFields,
    append: appendAllowance,
    remove: removeAllowance
  } = useFieldArray({
    control: form.control,
    name: EContractEmployeeFormKey.Allowances
  })
  const estimatedCostsData = [
    {
      label: t('inputLabel.probationSalary'),
      value: formatHelper.formatCurrency(Number(baseSalaryValue))
    },
    {
      label: t('title.fixedAllowance'),
      value: formatHelper.formatCurrency(
        allowancesValue?.reduce(
          (total, allowance) => total + Number(formatHelper.formatPrice(allowance.amount).raw || 0),
          0
        ) ?? 0
      )
    }
  ]
  useEffect(() => {
    const baseSalary = formatHelper.formatPrice(baseSalaryValue).raw
    const probationSalaryRate = formatHelper.formatNumber(probationSalaryRateValue)
    if (!baseSalary || !probationSalaryRate) {
      form.setValue(EContractEmployeeFormKey.ProbationSalary, '')
      return
    }
    const calculatedProbationSalary = Math.round((Number(baseSalary) * Number(probationSalaryRate)) / 100)
    form.setValue(EContractEmployeeFormKey.ProbationSalary, String(calculatedProbationSalary))
  }, [baseSalaryValue, form, probationSalaryRateValue])

  return (
    <form className='grid grid-cols-12 gap-4'>
      <section className='col-span-12 flex flex-col gap-4 sm:col-span-8 md:col-span-9'>
        <CardCustom title={t('title.contractDetails')}>
          <section className='grid grid-cols-12 gap-4'>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.ContractType}
                label={t('inputLabel.contractType')}
                isRequired
                render={(field, fieldState) => (
                  <FormSelectField
                    field={field}
                    fieldState={fieldState}
                    options={contractTypeOptions}
                    placeHolder={t('inputPlaceholder.select')}
                    disabled={contractTypeOptions.length === 0}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.ContractNumber}
                label={t('inputLabel.contractNumber')}
                render={(field, fieldState) => (
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.SignedDate}
                label={t('inputLabel.signedDate')}
                isRequired
                render={(field, fieldState) => (
                  <FormDateTimePickerField
                    field={field}
                    fieldState={fieldState}
                    placeHolder={t('inputPlaceholder.pleaseSelectDate')}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.EffectiveDate}
                label={t('inputLabel.effectiveDate')}
                isRequired
                render={(field, fieldState) => (
                  <FormDateTimePickerField
                    field={field}
                    fieldState={fieldState}
                    placeHolder={t('inputPlaceholder.pleaseSelectDate')}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.ExpiryDate}
                label={t('inputLabel.expiryDate')}
                isRequired
                render={(field, fieldState) => (
                  <FormDateTimePickerField
                    field={field}
                    fieldState={fieldState}
                    placeHolder={t('inputPlaceholder.pleaseSelectDate')}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.ProbationSalaryRate}
                label={t('inputLabel.probationSalaryRate')}
                isRequired
                render={(field, fieldState) => (
                  <Input
                    {...field}
                    id={field.name}
                    inputMode='numeric'
                    aria-invalid={fieldState.invalid}
                    placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                    onChange={(event) => field.onChange(formatHelper.formatNumber(event.target.value))}
                  />
                )}
              />
            </Field>
          </section>
        </CardCustom>

        <CardCustom title={t('title.income')}>
          <section className='grid grid-cols-12 gap-4'>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.BaseSalary}
                label={t('inputLabel.baseSalary')}
                isRequired
                render={(field, fieldState) => (
                  <Input
                    {...field}
                    id={field.name}
                    inputMode='numeric'
                    aria-invalid={fieldState.invalid}
                    placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                    value={field.value ? formatHelper.formatPrice(field.value)?.formatted : ''}
                    onChange={(e) => {
                      const { raw } = formatHelper.formatPrice(e.target.value)
                      field.onChange(raw)
                    }}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.ProbationSalary}
                label={`${t('inputLabel.probationSalary')} ${probationSalaryRateValue && `(${probationSalaryRateValue}%)`}`}
                isRequired
                render={(field, fieldState) => (
                  <Input
                    {...field}
                    id={field.name}
                    inputMode='numeric'
                    aria-invalid={fieldState.invalid}
                    placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                    value={field.value ? formatHelper.formatPrice(field.value)?.formatted : ''}
                    onChange={(e) => {
                      const { raw } = formatHelper.formatPrice(e.target.value)
                      field.onChange(raw)
                    }}
                    disabled
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.InsuranceSalary}
                label={t('inputLabel.insuranceSalary')}
                isRequired
                render={(field, fieldState) => (
                  <Input
                    {...field}
                    id={field.name}
                    inputMode='numeric'
                    aria-invalid={fieldState.invalid}
                    placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                    value={field.value ? formatHelper.formatPrice(field.value)?.formatted : ''}
                    onChange={(e) => {
                      const { raw } = formatHelper.formatPrice(e.target.value)
                      field.onChange(raw)
                    }}
                  />
                )}
              />
            </Field>
          </section>
        </CardCustom>

        <CardCustom title={t('title.fixedAllowance')}>
          <section className='flex flex-col gap-4'>
            <ButtonAction
              type='button'
              actionType='CREATE'
              actionName={t('action.addAllowance')}
              onClick={() => appendAllowance({ allowanceName: '', amount: '' })}
              className='mr-auto'
            />
            <section className='flex flex-col gap-4'>
              {allowanceFields.map((allowance, index) => (
                <section key={allowance.id} className='flex items-start gap-4'>
                  <Field>
                    <FormField
                      control={form.control}
                      name={`${EContractEmployeeFormKey.Allowances}.${index}.${EContractEmployeeFormKey.AllowanceName}`}
                      label={t('inputLabel.allowanceName')}
                      render={(field, fieldState) => (
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                        />
                      )}
                    />
                  </Field>
                  <Field>
                    <FormField
                      control={form.control}
                      name={`${EContractEmployeeFormKey.Allowances}.${index}.${EContractEmployeeFormKey.Amount}`}
                      label={t('inputLabel.amount')}
                      render={(field, fieldState) => (
                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            id={field.name}
                            inputMode='numeric'
                            aria-invalid={fieldState.invalid}
                            placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                            value={field.value ? formatHelper.formatPrice(field.value)?.formatted : ''}
                            onChange={(event) => {
                              const { raw } = formatHelper.formatPrice(event.target.value)
                              field.onChange(raw)
                            }}
                          />
                          <InputGroupAddon align={'inline-end'}>
                            <span>đ</span>
                          </InputGroupAddon>
                        </InputGroup>
                      )}
                    />
                  </Field>

                  <ButtonAction
                    type='button'
                    actionType='DELETE'
                    actionName={t('action.delete')}
                    onClick={() => removeAllowance(index)}
                    className='mt-5.5'
                  />
                </section>
              ))}
            </section>
          </section>
        </CardCustom>

        <CardCustom title={t('title.insuranceTaxAccount')}>
          <section className='grid grid-cols-12 gap-4'>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.TaxCode}
                label={t('inputLabel.taxCode')}
                isRequired
                render={(field, fieldState) => (
                  <Input
                    {...field}
                    id={field.name}
                    inputMode='numeric'
                    aria-invalid={fieldState.invalid}
                    placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                    onChange={(event) => field.onChange(formatHelper.formatNumber(event.target.value))}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.SocialInsuranceNumber}
                label={t('inputLabel.socialInsuranceNumber')}
                isRequired
                render={(field, fieldState) => (
                  <Input
                    {...field}
                    id={field.name}
                    inputMode='numeric'
                    aria-invalid={fieldState.invalid}
                    placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                    onChange={(event) => field.onChange(formatHelper.formatNumber(event.target.value))}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.BankName}
                label={t('inputLabel.bankName')}
                isRequired
                render={(field, fieldState) => (
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12 md:col-span-6'>
              <FormField
                control={form.control}
                name={EContractEmployeeFormKey.BankAccountNumber}
                label={t('inputLabel.bankAccountNumber')}
                isRequired
                render={(field, fieldState) => (
                  <Input
                    {...field}
                    id={field.name}
                    inputMode='numeric'
                    aria-invalid={fieldState.invalid}
                    placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                    onChange={(event) => field.onChange(formatHelper.formatNumber(event.target.value))}
                  />
                )}
              />
            </Field>
          </section>
        </CardCustom>
      </section>
      <aside className='col-span-12 sm:col-span-4 md:col-span-3 flex flex-col gap-4'>
        <CardCustom title={t('title.estimatedCosts')}>
          <section className='flex flex-col gap-2'>
            {estimatedCostsData?.map((item, index) => {
              return (
                <section key={index} className='flex items-center justify-between gap-2 flex-wrap'>
                  <p className='text-[#6E7F96]'>{item?.label}</p>
                  <p className='font-semibold'>{item?.value}</p>
                </section>
              )
            })}
          </section>
        </CardCustom>
        <CardCustom title={t('title.note')}>
          <section className='flex flex-col gap-4'>
            <section className='flex items-start gap-3'>
              <InfoCircleIcon className='size-5 shrink-0 text-blue-500' />
              <p className='text-app-primay'>{t('msg.probationInsuranceNote')}</p>
            </section>
            <section className='flex items-start gap-3'>
              <DangerIcon className='size-5 shrink-0 text-orange-400' />
              <p className='text-app-primay'>{t('msg.allowanceInsuranceNote')}</p>
            </section>
          </section>
        </CardCustom>
      </aside>
    </form>
  )
}

export default ContractEmployeeForm
