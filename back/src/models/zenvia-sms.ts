
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export interface IZenviaSMS {

	CD_ID_SMS: string;
	ID_NUM_CLLR_CLI: string;
	CD_ESTB: number;
	DT_H_ENV_SMS: string;
	TXT_T_ENV: string;
	ID_STAT_ENV_MSG: number;
	TXT_STAT_ENV_MSG: string;
	ID_DTLH_STAT: number;
	TXT_MSG_DTLH_STAT: string;
	DT_H_RCBM_SMS: string;
	NM_OPRD_TEL: string;
	
}


@Entity({ name: 'CESTCTS' })
export default class ZenviaSMS extends BaseEntity implements IZenviaSMS {

	@PrimaryColumn({ name: 'CD_ID_SMS', type: 'varchar'})
	public CD_ID_SMS: string;

	@Column('varchar', { nullable: true, name: 'ID_NUM_CLLR_CLI' })
	public ID_NUM_CLLR_CLI: string;

	@Column('bigint', { nullable: true, name: 'CD_ESTB' })
	public CD_ESTB: number;

	@Column('date', { nullable: true, name: 'DT_H_ENV_SMS' })
	public DT_H_ENV_SMS: string;

	@Column('varchar', { nullable: true, name: 'TXT_T_ENV' })
	public TXT_T_ENV: string;

	@Column('int', { nullable: true, name: 'ID_STAT_ENV_MSG' })
	public ID_STAT_ENV_MSG: number;

	@Column('varchar', { nullable: true, name: 'TXT_STAT_ENV_MSG' })
	public TXT_STAT_ENV_MSG: string;

	@Column('int', { nullable: true, name: 'ID_DTLH_STAT' })
	public ID_DTLH_STAT: number;

	@Column('varchar', { nullable: true, name: 'TXT_MSG_DTLH_STAT' })
	public TXT_MSG_DTLH_STAT: string;

	@Column('date', { nullable: true, name: 'DT_H_RCBM_SMS' })
	public DT_H_RCBM_SMS: string;

	@Column('varchar', { nullable: true, name: 'NM_OPRD_TEL' })
	public NM_OPRD_TEL: string;

}

