drop policy "Staff can create new patient" on "public"."PATIENT";

drop policy "Staff can view all patients" on "public"."PATIENT";

drop policy "Staff can create Staff" on "public"."STAFF";

drop view if exists "public"."medical_tab";

drop view if exists "public"."patient_summary";

alter table "public"."MEDICAL_VISIT" drop column "complaint_findings";

alter table "public"."MEDICAL_VISIT" drop column "treatment";

alter table "public"."MEDICAL_VISIT" add column "type" text;

alter table "public"."MEDICAL_VISIT" add column "visit_log" jsonb default '{"date": "", "complaint": "", "treatment": ""}'::jsonb;

create or replace view "public"."medical_tab" as  SELECT mv.id,
    mv.patient_id,
    concat_ws(' '::text, pp.first_name, pp.middle_name, pp.last_name) AS patient_name,
    pp.course,
    mv.visit_date,
    mv.staff_id,
    (mv.visit_log ->> 'status'::text) AS status
   FROM (public."MEDICAL_VISIT" mv
     JOIN public."PATIENT_PROFILE" pp ON ((pp.patient_id = mv.patient_id)));


create or replace view "public"."patient_summary" as  SELECT patient_id,
    TRIM(BOTH FROM concat_ws(' '::text, first_name, middle_name, last_name)) AS patient_name,
    course,
    department,
    school_year,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('id', a.id, 'date', a.scheduled_start, 'title', a.reason, 'notes', a.notes, 'staff_id', a.staff_id, 'provider', TRIM(BOTH FROM concat_ws(' '::text, s.first_name, s.middle_name, s.last_name))) ORDER BY a.scheduled_start DESC) AS jsonb_agg
           FROM (public."APPOINTMENT" a
             LEFT JOIN public."STAFF" s ON ((s.staff_id = a.staff_id)))
          WHERE (a.patient_id = p.patient_id)), '[]'::jsonb) AS appointment,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('id', mv.id, 'date', COALESCE(NULLIF((mv.visit_log ->> 'date'::text), ''::text), (mv.visit_date)::text), 'title', (mv.visit_log ->> 'complaint'::text), 'notes', (mv.visit_log ->> 'treatment'::text), 'staff_id', mv.staff_id, 'provider', TRIM(BOTH FROM concat_ws(' '::text, s.first_name, s.middle_name, s.last_name))) ORDER BY mv.visit_date DESC) AS jsonb_agg
           FROM (public."MEDICAL_VISIT" mv
             LEFT JOIN public."STAFF" s ON ((s.staff_id = mv.staff_id)))
          WHERE (mv.patient_id = p.patient_id)), '[]'::jsonb) AS medical,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('id', dv.id, 'date', dv.visit_date, 'title', dv.status, 'notes', dv.notes, 'staff_id', dv.staff_id, 'provider', TRIM(BOTH FROM concat_ws(' '::text, s.first_name, s.middle_name, s.last_name))) ORDER BY dv.visit_date DESC) AS jsonb_agg
           FROM (public."DENTAL_VISIT" dv
             LEFT JOIN public."STAFF" s ON ((s.staff_id = dv.staff_id)))
          WHERE (dv.patient_id = p.patient_id)), '[]'::jsonb) AS dental
   FROM public."PATIENT_PROFILE" p;



  create policy "Staff can Interact with this table"
  on "public"."PATIENT"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public."STAFF" s
  WHERE (s.id = auth.uid()))));



  create policy "Staff can Interact with this table"
  on "public"."STAFF"
  as permissive
  for all
  to authenticated
using ((((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text) = 'staff'::text));



